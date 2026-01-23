package vn.kurisu.tradeservice.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
// import org.springframework.security.core.context.SecurityContextHolder; 
// Assuming authentication is handled and userId is extracted from token in Controller or Utility
import org.springframework.stereotype.Service;
import vn.kurisu.tradeservice.dto.request.ReviewRequest;
import vn.kurisu.tradeservice.dto.response.ReviewResponse;
import vn.kurisu.tradeservice.entity.Order;
import vn.kurisu.tradeservice.entity.Review;
import vn.kurisu.tradeservice.entity.ReviewType;
import vn.kurisu.tradeservice.exception.AppException;
import vn.kurisu.tradeservice.exception.ErrorCode;
import vn.kurisu.tradeservice.mapper.ReviewMapper;
import vn.kurisu.tradeservice.repository.OrderRepository;
import vn.kurisu.tradeservice.repository.ReviewRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewService {
    ReviewRepository reviewRepository;
    OrderRepository orderRepository;
    ReviewMapper reviewMapper;

    public ReviewResponse createReview(ReviewRequest request) {
        UUID reviewerId = request.getReviewerId();

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!"COMPLETED".equalsIgnoreCase(order.getStatus())) {
             throw new RuntimeException("Order must be completed to leave a review");
        }

        UUID targetId;
        ReviewType reviewType;

        // Determine Review Type and Target
        UUID sellerId = order.getOrderItems().get(0).getSellerId(); // Assuming single seller per order for now
        
        if (reviewerId.equals(order.getBuyerId())) {
            // Buyer reviewing Seller
            targetId = sellerId;
            reviewType = ReviewType.BUYER_TO_SELLER;
        } else if (reviewerId.equals(sellerId)) {
            // Seller reviewing Buyer
            targetId = order.getBuyerId();
            reviewType = ReviewType.SELLER_TO_BUYER;
        } else {
            throw new RuntimeException("You are not a participant of this order");
        }

        if (reviewRepository.existsByOrderIdAndReviewerIdAndReviewType(order.getId(), reviewerId, reviewType)) {
            throw new RuntimeException("You have already reviewed this order");
        }

        Review review = reviewMapper.toReview(request);
        review.setReviewerId(reviewerId);
        review.setTargetId(targetId);
        review.setReviewType(reviewType);

        return reviewMapper.toReviewResponse(reviewRepository.save(review));
    }

    public List<ReviewResponse> getReviewsReceivedByUser(UUID userId) {
        return reviewRepository.findByTargetId(userId).stream()
                .map(reviewMapper::toReviewResponse)
                .toList();
    }
    
    public Double getUserReputation(UUID userId) {
        List<Review> reviews = reviewRepository.findByTargetId(userId);
        if (reviews.isEmpty()) return 0.0;
        
        double average = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
                
        return Math.round(average * 10.0) / 10.0; // Round to 1 decimal place
    }
}
