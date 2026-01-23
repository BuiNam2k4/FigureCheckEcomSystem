package vn.kurisu.tradeservice.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import vn.kurisu.tradeservice.entity.ReviewType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse {
    UUID id;
    UUID orderId;
    UUID reviewerId;
    UUID targetId;
    int rating;
    String comment;
    ReviewType reviewType;
    List<String> imageUrls;
    LocalDateTime createdAt;
}
