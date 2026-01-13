package vn.kurisu.tradeservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.kurisu.tradeservice.dto.request.ListingRequest;
import vn.kurisu.tradeservice.dto.request.ListingFilterRequest;
import vn.kurisu.tradeservice.dto.response.ListingResponse;
import vn.kurisu.tradeservice.entity.Listing;
import vn.kurisu.tradeservice.entity.ListingImage;
import vn.kurisu.tradeservice.exception.AppException;
import vn.kurisu.tradeservice.exception.ErrorCode;
import vn.kurisu.tradeservice.mapper.ListingMapper;
import vn.kurisu.tradeservice.repository.ListingRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingServiceImpl implements vn.kurisu.tradeservice.service.ListingService {
    private final ListingRepository listingRepository;
    private final ListingMapper listingMapper;
    private final vn.kurisu.tradeservice.client.ProductClient productClient;

    @Override
    @Transactional
    public ListingResponse createListing(ListingRequest request) {
        Listing listing = listingMapper.toListing(request);
        
        // 1. Fetch Product Info via Feign (Snapshot Pattern)
        try {
            UUID productId = UUID.fromString(request.getProductId());
            var productResponse = productClient.getProductById(productId);
            
            if (productResponse != null && productResponse.getResult() != null) {
                var product = productResponse.getResult();
                listing.setProductName(product.getName());
                
                // Set Thumbnail from product images if available
                if (product.getImages() != null && !product.getImages().isEmpty()) {
                     listing.setProductThumbnail(product.getImages().get(0).getImageUrl());
                }
            } else {
                 throw new AppException(ErrorCode.INVALID_KEY);
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch product for snapshot: " + e.getMessage());
             throw new AppException(ErrorCode.INVALID_KEY);
        }

        // Ideally should get from SecurityContext holder
        // listing.setUserId(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6")); // Logic to get current user
        // Use the userId from request if available, or keep hardcoded for now as per previous implementation unless refactoring security
        // Use userId from request if available
        if (request.getUserId() != null) {
            listing.setUserId(UUID.fromString(request.getUserId()));
        } else {
            // Fallback for testing or if missing
            listing.setUserId(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6")); 
        }


        if (request.getImageUrls() != null) {
            List<ListingImage> images = request.getImageUrls().stream()
                    .map(url -> ListingImage.builder()
                            .listing(listing)
                            .imageUrl(url)
                            .isThumbnail(false)
                            .build())
                    .collect(Collectors.toList());
            if (!images.isEmpty()) {
                images.get(0).setThumbnail(true);
            }
            listing.setImages(images);
        }

        Listing savedListing = listingRepository.save(listing);
        return listingMapper.toListingResponse(savedListing);
    }

    @Override
    public ListingResponse getListing(UUID id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.LISTING_NOT_FOUND));
        return toListingResponseWithSnapshot(listing);
    }

    @Override
    public List<ListingResponse> getListingsByUser(UUID userId) {
        return listingRepository.findByUserId(userId).stream()
                .map(this::toListingResponseWithSnapshot)
                .collect(Collectors.toList());
    }

    @Override
    public List<ListingResponse> getListingsByProduct(UUID productId) {
        return listingRepository.findByProductId(productId).stream()
                .map(this::toListingResponseWithSnapshot)
                .collect(Collectors.toList());
    }

    @Override
    public List<ListingResponse> getAllListings() {
        return listingRepository.findAll().stream()
                .map(this::toListingResponseWithSnapshot)
                .collect(Collectors.toList());
    }

    @Override
    public vn.kurisu.tradeservice.dto.response.PageResponse<ListingResponse> getAllListings(ListingFilterRequest filter) {
        // ... (Filter logic remains mostly the same, simplified for brevity in diff)
        // Ensure filter logic still works. If filtering by category/manufacturer, we still need to query Product Service 
        // to get matching Product IDs, because Listing doesn't store category/manufacturer, only snapshot name.
        
        List<UUID> productIds = null;
        if ((filter.getCategories() != null && !filter.getCategories().isEmpty()) ||
            (filter.getManufacturers() != null && !filter.getManufacturers().isEmpty()) ||
            (filter.getSeries() != null && !filter.getSeries().isEmpty())) {
            
            try {
                var productsResponse = productClient.searchProducts(filter.getCategories(), filter.getManufacturers(), filter.getSeries());
                if (productsResponse != null && productsResponse.getResult() != null) {
                    productIds = productsResponse.getResult().stream()
                            .map(p -> p.getId())
                            .collect(Collectors.toList());
                    
                    if (productIds.isEmpty()) {
                         return vn.kurisu.tradeservice.dto.response.PageResponse.<ListingResponse>builder()
                                .data(java.util.Collections.emptyList())
                                .currentPage(filter.getPage())
                                .pageSize(filter.getSize())
                                .totalPages(0)
                                .totalElements(0)
                                .build();
                    }
                }
            } catch (Exception e) {
                 return vn.kurisu.tradeservice.dto.response.PageResponse.<ListingResponse>builder()
                                .data(java.util.Collections.emptyList())
                                .currentPage(filter.getPage())
                                .pageSize(filter.getSize())
                                .totalPages(0)
                                .totalElements(0)
                                .build();
            }
        }

        org.springframework.data.jpa.domain.Specification<Listing> spec = vn.kurisu.tradeservice.specification.ListingSpecification.filterListings(filter, productIds);
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(filter.getPage() - 1, filter.getSize());
        org.springframework.data.domain.Page<Listing> page = listingRepository.findAll(spec, pageable);
        
        List<ListingResponse> data = page.getContent().stream()
                .map(this::toListingResponseWithSnapshot)
                .collect(Collectors.toList());

        return vn.kurisu.tradeservice.dto.response.PageResponse.<ListingResponse>builder()
                .currentPage(filter.getPage())
                .pageSize(filter.getSize())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .data(data)
                .build();
    }
    
    private ListingResponse toListingResponseWithSnapshot(Listing listing) {
        ListingResponse response = listingMapper.toListingResponse(listing);
        // Use Snapshot data directly
        response.setProductName(listing.getProductName());
        response.setProductThumbnail(listing.getProductThumbnail());
        // Note: Series and Manufacturer are NOT in the snapshot currently. 
        // If the user wants to avoid ALL calls, we should also snapshot those. 
        // But the requirement specifically mentioned "product_name and product_thumbnail".
        // I will adhere to the prompt. If series/manufacturer are needed for display, 
        // we might still need a call or add them to snapshot. 
        // For now, I will NOT call product service for them to strictly follow "Snapshot" for the requested fields.
        return response;
    }

    @Override
    public void deleteListing(UUID id) {
        if (!listingRepository.existsById(id)) {
            throw new AppException(ErrorCode.LISTING_NOT_FOUND);
        }
        listingRepository.deleteById(id);
    }
}
