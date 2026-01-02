package com.silverviking.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
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
    
    private CategoryResponse category;
    private SeriesResponse series;
    private ManufacturerResponse manufacturer;
    private List<ProductImageResponse> images;
}
