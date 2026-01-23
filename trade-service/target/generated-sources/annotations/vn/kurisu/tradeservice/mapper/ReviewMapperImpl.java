package vn.kurisu.tradeservice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import vn.kurisu.tradeservice.dto.request.ReviewRequest;
import vn.kurisu.tradeservice.dto.response.ReviewResponse;
import vn.kurisu.tradeservice.entity.Review;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-15T22:24:32+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public Review toReview(ReviewRequest request) {
        if ( request == null ) {
            return null;
        }

        Review.ReviewBuilder review = Review.builder();

        review.orderId( request.getOrderId() );
        review.reviewerId( request.getReviewerId() );
        review.rating( request.getRating() );
        review.comment( request.getComment() );
        List<String> list = request.getImageUrls();
        if ( list != null ) {
            review.imageUrls( new ArrayList<String>( list ) );
        }

        return review.build();
    }

    @Override
    public ReviewResponse toReviewResponse(Review review) {
        if ( review == null ) {
            return null;
        }

        ReviewResponse.ReviewResponseBuilder reviewResponse = ReviewResponse.builder();

        reviewResponse.id( review.getId() );
        reviewResponse.orderId( review.getOrderId() );
        reviewResponse.reviewerId( review.getReviewerId() );
        reviewResponse.targetId( review.getTargetId() );
        reviewResponse.rating( review.getRating() );
        reviewResponse.comment( review.getComment() );
        reviewResponse.reviewType( review.getReviewType() );
        List<String> list = review.getImageUrls();
        if ( list != null ) {
            reviewResponse.imageUrls( new ArrayList<String>( list ) );
        }
        reviewResponse.createdAt( review.getCreatedAt() );

        return reviewResponse.build();
    }
}
