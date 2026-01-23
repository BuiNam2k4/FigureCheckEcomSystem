package vn.kurisu.tradeservice.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewRequest {
    @NotNull(message = "Order ID is mandatory")
    UUID orderId;

    @NotNull(message = "Reviewer ID is mandatory")
    UUID reviewerId;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    int rating;

    String comment;

    List<String> imageUrls;
}
