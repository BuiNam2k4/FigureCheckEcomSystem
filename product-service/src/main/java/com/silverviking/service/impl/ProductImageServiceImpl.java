package com.silverviking.service.impl;

import com.silverviking.domain.Product;
import com.silverviking.domain.ProductImage;
import com.silverviking.dto.request.ProductImageRequest;
import com.silverviking.dto.response.ProductImageResponse;
import com.silverviking.exception.EntityNotFoundException;
import com.silverviking.repository.ProductImageRepository;
import com.silverviking.repository.ProductRepository;
import com.silverviking.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public ProductImageResponse addImage(ProductImageRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + request.getProductId()));

        ProductImage image = ProductImage.builder()
                .imageUrl(request.getImageUrl())
                .type(com.silverviking.enums.ImageType.valueOf(request.getType()))
                .isThumbnail(request.getIsThumbnail())
                .product(product)
                .build();
        ProductImage saved = productImageRepository.save(image);
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public void deleteImage(Long id) {
        if (!productImageRepository.existsById(id)) {
            throw new EntityNotFoundException("Image not found with id: " + id);
        }
        productImageRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductImageResponse> getImagesByProductId(UUID productId) {
        if (!productRepository.existsById(productId)) {
             throw new EntityNotFoundException("Product not found with id: " + productId);
        }
        Product product = productRepository.findById(productId)
              .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
        
        return product.getImages().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProductImageResponse updateImage(Long id, ProductImageRequest request) {
        ProductImage image = productImageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Image not found with id: " + id));
        
        image.setImageUrl(request.getImageUrl());
        image.setType(com.silverviking.enums.ImageType.valueOf(request.getType()));
        image.setIsThumbnail(request.getIsThumbnail());
        
        ProductImage updated = productImageRepository.save(image);
        return mapToResponse(updated);
    }

    private ProductImageResponse mapToResponse(ProductImage image) {
        return ProductImageResponse.builder()
                .id(image.getId())
                .imageUrl(image.getImageUrl())
                .type(image.getType().name())
                .isThumbnail(image.getIsThumbnail())
                .build();
    }
}
