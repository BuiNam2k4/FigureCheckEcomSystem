package vn.kurisu.tradeservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingRequest {
    private String productId;
    private String userId;
    private BigDecimal price;
    private int quantity;
    private String condition;
    private String description;
    private List<String> imageUrls;
}
