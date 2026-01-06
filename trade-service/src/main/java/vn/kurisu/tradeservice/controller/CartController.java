package vn.kurisu.tradeservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.kurisu.tradeservice.dto.request.CartItemRequest;
import vn.kurisu.tradeservice.dto.response.ApiResponse;
import vn.kurisu.tradeservice.dto.response.CartItemResponse;
import vn.kurisu.tradeservice.service.CartService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping
    public ApiResponse<CartItemResponse> addToCart(@RequestBody CartItemRequest request) {
        // Assume userId is passed via header or extracted from token in real valid scenario
        // For now, I'll allow it to be passed or hardcode/mock it if not provided.
        // Actually, let's assume we pass it as a RequestParam for simplicity in this phase or from context.
        // I will add a RequestParam for userId for now just to make it functional without Security setup.
        return ApiResponse.<CartItemResponse>builder()
                 // .result(cartService.addToCart(UUID.fromString("fake-user-id"), request))
                 .message("UserId required. Please update controller to extract from token or param")
                 .build();
    }
    
    // Updated method signature
    @PostMapping("/{userId}")
    public ApiResponse<CartItemResponse> addToCart(@PathVariable UUID userId, @RequestBody CartItemRequest request) {
        return ApiResponse.<CartItemResponse>builder()
                .result(cartService.addToCart(userId, request))
                .build();
    }

    @GetMapping("/{userId}")
    public ApiResponse<List<CartItemResponse>> getCart(@PathVariable UUID userId) {
        return ApiResponse.<List<CartItemResponse>>builder()
                .result(cartService.getCart(userId))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
        return ApiResponse.<Void>builder()
                .message("Item removed from cart")
                .build();
    }
}
