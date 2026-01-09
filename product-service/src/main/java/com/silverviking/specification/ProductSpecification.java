package com.silverviking.specification;

import com.silverviking.domain.Product;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {
    public static Specification<Product> filterProducts(List<String> categories, List<String> manufacturers, List<String> series) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (categories != null && !categories.isEmpty()) {
                predicates.add(root.get("category").get("name").in(categories));
            }

            if (manufacturers != null && !manufacturers.isEmpty()) {
                predicates.add(root.get("manufacturer").get("name").in(manufacturers));
            }

            if (series != null && !series.isEmpty()) {
                predicates.add(root.get("series").get("name").in(series));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
