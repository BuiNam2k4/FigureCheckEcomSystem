package vn.kurisu.tradeservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private String buyerId;
    private String shippingAddress;
    private String phoneNumber;
    private String paymentMethod;
    private List<String> listingIds; // For simplicity, create order from list of listings
    // Or maybe created from cart items? The user didn't specify checkout flow details.
    // I'll assume we can also pass a list of CartItem IDs or just listing IDs.
    // Given the domain, Buying generic listings.
}
