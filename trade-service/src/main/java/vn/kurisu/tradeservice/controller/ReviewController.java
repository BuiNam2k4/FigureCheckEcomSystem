package vn.kurisu.tradeservice.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
// import vn.kurisu.tradeservice.dto.ApiResponse; // Check if this exists, usually it's in a shared pkg or specific
// Based on OrderController, let's verify where ApiResponse is.
// Usually com.devteria.identityservice.dto.request.ApiResponse or similar pattern in this project.
// In trade-service, it might be vn.kurisu.tradeservice.dto.ApiResponse
import org.springframework.web.bind.annotation.*;
import vn.kurisu.tradeservice.dto.response.ApiResponse; 
import vn.kurisu.tradeservice.dto.request.ReviewRequest;
import vn.kurisu.tradeservice.dto.response.ReviewResponse;
import vn.kurisu.tradeservice.service.ReviewService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewController {
    ReviewService reviewService;

    @PostMapping
    ApiResponse<ReviewResponse> createReview(@RequestBody ReviewRequest request) {
        return ApiResponse.<ReviewResponse>builder()
                .result(reviewService.createReview(request))
                .build();
    }

    @GetMapping("/users/{userId}")
    ApiResponse<List<ReviewResponse>> getReviewsReceivedByUser(@PathVariable UUID userId) {
        return ApiResponse.<List<ReviewResponse>>builder()
                .result(reviewService.getReviewsReceivedByUser(userId))
                .build();
    }
    
    @GetMapping("/users/{userId}/reputation")
    ApiResponse<Double> getUserReputation(@PathVariable UUID userId) {
        return ApiResponse.<Double>builder()
                .result(reviewService.getUserReputation(userId))
                .build();
    }
}
