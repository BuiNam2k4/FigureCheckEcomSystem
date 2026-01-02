package com.silverviking.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductImageResponse {
    private Long id;
    private String imageUrl;
    private String type;
    private Boolean isThumbnail;
}
