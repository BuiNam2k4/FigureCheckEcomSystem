package vn.kurisu.tradeservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingFilterRequest {
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private String condition;
    private String sort; // price_asc, price_desc, newest
    private java.util.List<String> categories;
    private java.util.List<String> manufacturers;
    private java.util.List<String> series;
    
    @Builder.Default
    private int page = 1;
    
    @Builder.Default
    private int size = 12;
}
