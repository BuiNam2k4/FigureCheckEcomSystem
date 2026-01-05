package vn.kurisu.tradeservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.kurisu.tradeservice.entity.CartItem;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(UUID userId);
    Optional<CartItem> findByUserIdAndListingId(UUID userId, UUID listingId);
}
