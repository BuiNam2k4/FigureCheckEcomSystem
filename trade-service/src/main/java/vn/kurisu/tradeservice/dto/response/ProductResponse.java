package vn.kurisu.tradeservice.dto.response;

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
public class ProductResponse {
    private UUID id;
    private String name;
    private String slug;
    private BigDecimal priceMarket;
    private boolean isReleased;
    private java.sql.Date releaseDate;
    private String scale;
    private Double height;
    private String material;
    private String description;
    
    // We can include nested objects if we need them, but for snapshot we mostly need basic info & image
    private List<ProductImageResponse> images;
    private CategoryResponse category;
    private SeriesResponse series;
    private ManufacturerResponse manufacturer;
}
