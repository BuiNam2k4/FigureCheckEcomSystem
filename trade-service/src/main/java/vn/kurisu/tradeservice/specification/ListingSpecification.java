package vn.kurisu.tradeservice.specification;

import org.springframework.data.jpa.domain.Specification;
import vn.kurisu.tradeservice.dto.request.ListingFilterRequest;
import vn.kurisu.tradeservice.entity.Listing;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class ListingSpecification {

    public static Specification<Listing> filterListings(ListingFilterRequest request, List<java.util.UUID> productIds) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (productIds != null && !productIds.isEmpty()) {
                predicates.add(root.get("productId").in(productIds));
            }

            if (request.getMinPrice() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), request.getMinPrice()));
            }

            if (request.getMaxPrice() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), request.getMaxPrice()));
            }

            if (request.getCondition() != null && !request.getCondition().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("condition"), request.getCondition()));
            }
            
            // Filter only available listings by default unless specified otherwise
            // predicates.add(criteriaBuilder.equal(root.get("status"), "AVAILABLE"));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
