package com.silverviking.repository;

import com.silverviking.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>, org.springframework.data.jpa.repository.JpaSpecificationExecutor<Product> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findBySeriesId(Long seriesId);
    List<Product> findByManufacturerId(Long manufacturerId);
}
