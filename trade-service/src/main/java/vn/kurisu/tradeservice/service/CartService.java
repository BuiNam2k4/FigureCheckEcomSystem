package vn.kurisu.tradeservice.service;

import vn.kurisu.tradeservice.dto.request.CartItemRequest;
import vn.kurisu.tradeservice.dto.response.CartItemResponse;

import java.util.List;
import java.util.UUID;

public interface CartService {
    CartItemResponse addToCart(UUID userId, CartItemRequest request);
    List<CartItemResponse> getCart(UUID userId);
    void removeFromCart(Long cartItemId);
}
