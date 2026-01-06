package vn.kurisu.tradeservice.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Data;

@Data
public class ProductViewDTO {
    private UUID id;
    private String name;
    private String imageUrl;
    private BigDecimal marketPrice;
    private String serriesName;
    
}
