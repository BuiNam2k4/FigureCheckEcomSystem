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
        // Verify product exists
        try {
            UUID productId = UUID.fromString(request.getProductId());
            productClient.getProductById(productId);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INVALID_KEY); // Or PRODUCT_NOT_FOUND
        }

        Listing listing = listingMapper.toListing(request);
        // Assuming userId from context or request. creating fake userId for now or need to pass it
        // Ideally should get from SecurityContext holder
        listing.setUserId(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6")); // Logic to get current user

        if (request.getImageUrls() != null) {
            List<ListingImage> images = request.getImageUrls().stream()
                    .map(url -> ListingImage.builder()
                            .listing(listing)
                            .imageUrl(url)
                            .isThumbnail(false) // Logic for thumbnail can be added
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
        return listingMapper.toListingResponse(listing);
    }

    @Override
    public List<ListingResponse> getListingsByUser(UUID userId) {
        return listingRepository.findByUserId(userId).stream()
                .map(listingMapper::toListingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ListingResponse> getListingsByProduct(UUID productId) {
        return listingRepository.findByProductId(productId).stream()
                .map(listingMapper::toListingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ListingResponse> getAllListings() {
        return listingRepository.findAll().stream()
                .map(listing -> {
                    ListingResponse response = listingMapper.toListingResponse(listing);
                    try {
                        var productResponse = productClient.getProductById(listing.getProductId());
                        if (productResponse.getResult() != null) {
                            var product = productResponse.getResult();
                            response.setProductName(product.getName());
                            if(product.getSeries() != null) response.setSeries(product.getSeries().getName());
                            if(product.getManufacturer() != null) response.setManufacturer(product.getManufacturer().getName());
                        }
                    } catch (Exception e) {
                        // Log error or ignore if product service is down/product missing
                        response.setProductName("Unknown Product");
                    }
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public vn.kurisu.tradeservice.dto.response.PageResponse<ListingResponse> getAllListings(ListingFilterRequest filter) {
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
                System.err.println("Error fetching products for filter: " + e.getMessage());
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
                .map(listing -> {
                    ListingResponse response = listingMapper.toListingResponse(listing);
                    try {
                        var productResponse = productClient.getProductById(listing.getProductId());
                        if (productResponse.getResult() != null) {
                            var product = productResponse.getResult();
                            response.setProductName(product.getName());
                            if(product.getSeries() != null) response.setSeries(product.getSeries().getName());
                            if(product.getManufacturer() != null) response.setManufacturer(product.getManufacturer().getName());
                        }
                    } catch (Exception e) {
                         response.setProductName("Unknown Product");
                    }
                    return response;
                })
                .collect(Collectors.toList());

        return vn.kurisu.tradeservice.dto.response.PageResponse.<ListingResponse>builder()
                .currentPage(filter.getPage())
                .pageSize(filter.getSize())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .data(data)
                .build();
    }

    @Override
    public void deleteListing(UUID id) {
        if (!listingRepository.existsById(id)) {
            throw new AppException(ErrorCode.LISTING_NOT_FOUND);
        }
        listingRepository.deleteById(id);
    }
}
