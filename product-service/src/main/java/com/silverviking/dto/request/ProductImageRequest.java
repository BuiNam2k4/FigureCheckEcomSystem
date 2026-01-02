package com.silverviking.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.UUID;

@Data
public class ProductImageRequest {
    @NotBlank(message = "Image URL is required")
    private String imageUrl;
    
    // Type: FRONT, BACK, BOX, BASE, ACCESSORY
    private String type;
    
    private Boolean isThumbnail;
    
    private UUID productId;
}
