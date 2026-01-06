package vn.kurisu.tradeservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.kurisu.tradeservice.dto.request.ListingRequest;
import vn.kurisu.tradeservice.dto.response.ApiResponse;
import vn.kurisu.tradeservice.dto.response.ListingResponse;
import vn.kurisu.tradeservice.service.ListingService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {
    private final ListingService listingService;

    @PostMapping
    public ApiResponse<ListingResponse> createListing(@RequestBody ListingRequest request) {
        return ApiResponse.<ListingResponse>builder()
                .result(listingService.createListing(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ListingResponse> getListing(@PathVariable UUID id) {
        return ApiResponse.<ListingResponse>builder()
                .result(listingService.getListing(id))
                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<ListingResponse>> getListingsByUser(@PathVariable UUID userId) {
        return ApiResponse.<List<ListingResponse>>builder()
                .result(listingService.getListingsByUser(userId))
                .build();
    }

    @GetMapping("/product/{productId}")
    public ApiResponse<List<ListingResponse>> getListingsByProduct(@PathVariable UUID productId) {
        return ApiResponse.<List<ListingResponse>>builder()
                .result(listingService.getListingsByProduct(productId))
                .build();
    }

    @GetMapping
    public ApiResponse<List<ListingResponse>> getAllListings() {
        return ApiResponse.<List<ListingResponse>>builder()
                .result(listingService.getAllListings())
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteListing(@PathVariable UUID id) {
        listingService.deleteListing(id);
        return ApiResponse.<Void>builder()
                .message("Listing deleted successfully")
                .build();
    }
}
