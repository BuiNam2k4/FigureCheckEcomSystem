package com.silverviking.service.impl;

import com.silverviking.domain.Category;
import com.silverviking.domain.Manufacturer;
import com.silverviking.domain.Product;
import com.silverviking.domain.ProductImage;
import com.silverviking.domain.Series;
import com.silverviking.dto.request.ProductRequest;
import com.silverviking.dto.response.CategoryResponse;
import com.silverviking.dto.response.ManufacturerResponse;
import com.silverviking.dto.response.ProductImageResponse;
import com.silverviking.dto.response.ProductResponse;
import com.silverviking.dto.response.SeriesResponse;
import com.silverviking.exception.EntityNotFoundException;
import com.silverviking.repository.CategoryRepository;
import com.silverviking.repository.ManufacturerRepository;
import com.silverviking.repository.ProductRepository;
import com.silverviking.repository.SeriesRepository;
import com.silverviking.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SeriesRepository seriesRepository;
    private final ManufacturerRepository manufacturerRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        return mapToResponse(product);
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + request.getCategoryId()));

        Series series = null;
        if (request.getSeriesId() != null) {
            series = seriesRepository.findById(request.getSeriesId())
                    .orElseThrow(() -> new EntityNotFoundException("Series not found with id: " + request.getSeriesId()));
        }

        Manufacturer manufacturer = manufacturerRepository.findById(request.getManufacturerId())
                .orElseThrow(() -> new EntityNotFoundException("Manufacturer not found with id: " + request.getManufacturerId()));

        Product product = Product.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .priceMarket(request.getPriceMarket())
                .isReleased(request.isReleased())
                .releaseDate(request.getReleaseDate())
                .scale(request.getScale())
                .height(request.getHeight())
                .material(request.getMaterial())
                .description(request.getDescription())
                .category(category)
                .series(series)
                .manufacturer(manufacturer)
                .build();
        
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            List<ProductImage> images = request.getImages().stream()
                    .map(imgRequest -> ProductImage.builder()
                            .imageUrl(imgRequest.getImageUrl())
                            .isThumbnail(imgRequest.getIsThumbnail())
                            .type(imgRequest.getType() != null ? com.silverviking.enums.ImageType.valueOf(imgRequest.getType()) : null)
                            .product(product)
                            .build())
                    .collect(Collectors.toList());
            product.setImages(images);
        }

        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(UUID id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + request.getCategoryId()));
        
        Series series = null;
        if (request.getSeriesId() != null) {
            series = seriesRepository.findById(request.getSeriesId())
                    .orElseThrow(() -> new EntityNotFoundException("Series not found with id: " + request.getSeriesId()));
        }

        Manufacturer manufacturer = manufacturerRepository.findById(request.getManufacturerId())
                .orElseThrow(() -> new EntityNotFoundException("Manufacturer not found with id: " + request.getManufacturerId()));

        product.setName(request.getName());
        product.setSlug(request.getSlug());
        product.setPriceMarket(request.getPriceMarket());
        product.setReleased(request.isReleased());
        product.setReleaseDate(request.getReleaseDate());
        product.setScale(request.getScale());
        product.setHeight(request.getHeight());
        product.setMaterial(request.getMaterial());
        product.setDescription(request.getDescription());
        product.setCategory(category);
        product.setSeries(series);
        product.setManufacturer(manufacturer);
        
        // I will leave image update to separate image service or basic replacement if list provided.
        // Let's assume basic fields update for now to minimize complexity unless requested.
        
        Product updated = productRepository.save(product);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategoryId(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
             throw new EntityNotFoundException("Category not found with id: " + categoryId);
        }
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsBySeriesId(Long seriesId) {
        if (!seriesRepository.existsById(seriesId)) {
             throw new EntityNotFoundException("Series not found with id: " + seriesId);
        }
        return productRepository.findBySeriesId(seriesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> searchProducts(List<String> categories, List<String> manufacturers, List<String> series) {
        org.springframework.data.jpa.domain.Specification<Product> spec = com.silverviking.specification.ProductSpecification.filterProducts(categories, manufacturers, series);
        return productRepository.findAll(spec).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse mapToResponse(Product product) {
        CategoryResponse categoryResponse = CategoryResponse.builder()
                .id(product.getCategory().getId())
                .name(product.getCategory().getName())
                .description(product.getCategory().getDescription())
                .build();

        SeriesResponse seriesResponse = null;
        if (product.getSeries() != null) {
            seriesResponse = SeriesResponse.builder()
                    .id(product.getSeries().getId())
                    .name(product.getSeries().getName())
                    .build();
        }
        
        ManufacturerResponse manufacturerResponse = null;
        if (product.getManufacturer() != null) {
            manufacturerResponse = ManufacturerResponse.builder()
                    .id(product.getManufacturer().getId())
                    .name(product.getManufacturer().getName())
                    .originCountry(product.getManufacturer().getOriginCountry())
                    .build();
        }

        List<ProductImageResponse> imageResponses = product.getImages() != null ? 
                product.getImages().stream()
                    .map(img -> ProductImageResponse.builder()
                            .id(img.getId())
                            .imageUrl(img.getImageUrl())
                            .isThumbnail(img.getIsThumbnail())
                            .type(img.getType() != null ? img.getType().name() : null)
                            .build())
                    .collect(Collectors.toList()) : java.util.Collections.emptyList();

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .priceMarket(product.getPriceMarket())
                .isReleased(product.isReleased())
                .releaseDate(product.getReleaseDate())
                .scale(product.getScale())
                .height(product.getHeight())
                .material(product.getMaterial())
                .description(product.getDescription())
                .category(categoryResponse)
                .series(seriesResponse)
                .manufacturer(manufacturerResponse)
                .images(imageResponses)
                .build();
    }
}
