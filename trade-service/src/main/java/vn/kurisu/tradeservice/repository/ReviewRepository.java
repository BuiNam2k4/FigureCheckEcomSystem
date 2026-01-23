package vn.kurisu.tradeservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.kurisu.tradeservice.entity.Review;
import vn.kurisu.tradeservice.entity.ReviewType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByTargetId(UUID targetId);
    List<Review> findByReviewerId(UUID reviewerId);
    List<Review> findByOrderId(UUID orderId);
    Optional<Review> findByOrderIdAndReviewerIdAndReviewType(UUID orderId, UUID reviewerId, ReviewType reviewType);
    boolean existsByOrderIdAndReviewerIdAndReviewType(UUID orderId, UUID reviewerId, ReviewType reviewType);
}
