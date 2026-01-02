package com.silverviking.service;

import com.silverviking.dto.request.ProductImageRequest;
import com.silverviking.dto.response.ProductImageResponse;
import java.util.List;

public interface ProductImageService {
    ProductImageResponse addImage(ProductImageRequest request);
    void deleteImage(Long id);
    List<ProductImageResponse> getImagesByProductId(java.util.UUID productId);
    ProductImageResponse updateImage(Long id, ProductImageRequest request);
}
