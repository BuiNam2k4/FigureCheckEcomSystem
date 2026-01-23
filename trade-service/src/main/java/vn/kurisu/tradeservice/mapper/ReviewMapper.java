package vn.kurisu.tradeservice.mapper;

import org.mapstruct.Mapper;
import vn.kurisu.tradeservice.dto.request.ReviewRequest;
import vn.kurisu.tradeservice.dto.response.ReviewResponse;
import vn.kurisu.tradeservice.entity.Review;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review toReview(ReviewRequest request);
    ReviewResponse toReviewResponse(Review review);
}
