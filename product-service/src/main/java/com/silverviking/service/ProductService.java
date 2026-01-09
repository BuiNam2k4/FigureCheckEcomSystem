package com.silverviking.service;

import com.silverviking.dto.request.ProductRequest;
import com.silverviking.dto.response.ProductResponse;
import java.util.List;
import java.util.UUID;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(UUID id);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(UUID id, ProductRequest request);
    void deleteProduct(UUID id);
    List<ProductResponse> getProductsByCategoryId(Long categoryId);
    List<ProductResponse> getProductsBySeriesId(Long seriesId);
    List<ProductResponse> searchProducts(List<String> categories, List<String> manufacturers, List<String> series);
}
