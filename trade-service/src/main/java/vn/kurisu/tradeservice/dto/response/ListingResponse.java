package vn.kurisu.tradeservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.kurisu.tradeservice.entity.ListingImage;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingResponse {
    private UUID id;
    private UUID userId;
    private UUID productId;
    private BigDecimal price;
    private int quantity;
    private String condition;
    private String description;
    private String status;
    private String productName;
    private String productThumbnail;
    private String series;
    private String manufacturer;
    private List<ListingImageResponse> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
