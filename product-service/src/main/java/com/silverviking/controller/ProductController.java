package com.silverviking.controller;

import com.silverviking.dto.ApiResponse;
import com.silverviking.dto.request.ProductRequest;
import com.silverviking.dto.response.ProductResponse;
import com.silverviking.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {
        return ResponseEntity.ok(ApiResponse.success(productService.getAllProducts(), "Products retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductById(id), "Product found"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(@Valid @RequestBody ProductRequest request) {
        return new ResponseEntity<>(ApiResponse.success(productService.createProduct(request), "Product created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(@PathVariable UUID id, @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(ApiResponse.success(productService.updateProduct(id, request), "Product updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Product deleted successfully"));
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductsByCategoryId(@PathVariable Long categoryId) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductsByCategoryId(categoryId), "Products retrieved successfully"));
    }

    @GetMapping("/series/{seriesId}")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductsBySeriesId(@PathVariable Long seriesId) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductsBySeriesId(seriesId), "Products retrieved successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> searchProducts(
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) List<String> manufacturers,
            @RequestParam(required = false) List<String> series) {
        return ResponseEntity.ok(ApiResponse.success(productService.searchProducts(categories, manufacturers, series), "Products retrieved successfully"));
    }
}
