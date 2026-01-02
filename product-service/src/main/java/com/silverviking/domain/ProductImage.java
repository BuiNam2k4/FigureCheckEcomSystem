package com.silverviking.domain;

import com.silverviking.enums.ImageType;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "product_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "URL is required")
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "is_thumbnail")
    private Boolean isThumbnail;

    // Type: Front, Back, Box
    @Enumerated(EnumType.STRING)
    @Column(name = "image_type")
    private ImageType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
