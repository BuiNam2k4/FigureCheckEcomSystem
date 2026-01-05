package vn.kurisu.tradeservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "listing_id")
    private UUID listingId; // Can be null if listing is deleted

    @Column(name = "seller_id", nullable = false)
    private UUID sellerId;

    // Snapshot data
    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_image_url", length = 500)
    private String productImageUrl;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;
}
