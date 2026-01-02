package com.silverviking.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    @NotBlank(message = "Name is required")
    private String name;

    // SKU removed to match user request simplifications?
    // User explicitly listed: "id: UUID, name: Tên, price_market: ..., is_released: ..."
    // I will keep SKU optional or remove it?
    // User request: "products: id, name, price_market, is_released, product_images"
    // I'll adhere strictly to user request and remove SKU from DTO to avoid confusion.
    
    @NotNull(message = "Price Market is required")
    @PositiveOrZero(message = "Price must be positive or zero")
    private BigDecimal priceMarket;

    private boolean isReleased;
    private java.sql.Date releaseDate;

    @NotBlank(message = "Slug is required")
    private String slug;
    
    private String scale;
    private Double height;
    private String material;
    private String description;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotNull(message = "Manufacturer ID is required")
    private Long manufacturerId;

    private Long seriesId;
    
    private List<ProductImageRequest> images;
}
