package vn.kurisu.tradeservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.kurisu.tradeservice.entity.Listing;

import java.util.List;
import java.util.UUID;

@Repository
public interface ListingRepository extends JpaRepository<Listing, UUID>, org.springframework.data.jpa.repository.JpaSpecificationExecutor<Listing> {
    List<Listing> findByUserId(UUID userId);
    List<Listing> findByProductId(UUID productId);
}
