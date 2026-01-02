package com.silverviking.controller;

import com.silverviking.dto.ApiResponse;
import com.silverviking.dto.request.ProductImageRequest;
import com.silverviking.dto.response.ProductImageResponse;
import com.silverviking.service.ProductImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/product-images")
@RequiredArgsConstructor
public class ProductImageController {

    private final ProductImageService productImageService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductImageResponse>> addImage(@Valid @RequestBody ProductImageRequest request) {
        return new ResponseEntity<>(ApiResponse.success(productImageService.addImage(request), "Image added successfully"), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteImage(@PathVariable Long id) {
        productImageService.deleteImage(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Image deleted successfully"));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ProductImageResponse>>> getImagesByProduct(@PathVariable UUID productId) {
        return ResponseEntity.ok(ApiResponse.success(productImageService.getImagesByProductId(productId), "Images retrieved successfully"));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductImageResponse>> updateImage(@PathVariable Long id, @Valid @RequestBody ProductImageRequest request) {
        return ResponseEntity.ok(ApiResponse.success(productImageService.updateImage(id, request), "Image updated successfully"));
    }
}
