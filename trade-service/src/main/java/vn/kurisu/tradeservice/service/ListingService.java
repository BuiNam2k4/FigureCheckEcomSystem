package vn.kurisu.tradeservice.service;

import vn.kurisu.tradeservice.dto.request.ListingRequest;
import vn.kurisu.tradeservice.dto.response.ListingResponse;

import java.util.List;
import java.util.UUID;

public interface ListingService {
    ListingResponse createListing(ListingRequest request);
    ListingResponse getListing(UUID id);
    List<ListingResponse> getListingsByUser(UUID userId);
    List<ListingResponse> getListingsByProduct(UUID productId);
    List<ListingResponse> getAllListings();
    void deleteListing(UUID id);
}
