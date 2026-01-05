package vn.kurisu.tradeservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.kurisu.tradeservice.dto.request.ListingRequest;
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

    @Override
    @Transactional
    public ListingResponse createListing(ListingRequest request) {
        Listing listing = listingMapper.toListing(request);
        // Assuming userId from context or request. creating fake userId for now or need to pass it
        // Ideally should get from SecurityContext holder
        listing.setUserId(UUID.randomUUID()); // TODO: Get from auth context

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
    public List<ListingResponse> getAllListings() {
        return listingRepository.findAll().stream()
                .map(listingMapper::toListingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteListing(UUID id) {
        if (!listingRepository.existsById(id)) {
            throw new AppException(ErrorCode.LISTING_NOT_FOUND);
        }
        listingRepository.deleteById(id);
    }
}
