package main.java.vn.kurisu.tradeservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.kurisu.tradeservice.dto.request.OrderRequest;
import vn.kurisu.tradeservice.dto.response.ApiResponse;
import vn.kurisu.tradeservice.dto.response.OrderResponse;
import vn.kurisu.tradeservice.service.OrderService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        // Similar to Cart, assuming buyerId is passed in request or context.
        // OrderRequest has buyerId? Let's check DTO.
        // Yes, OrderRequest has buyerId (String).
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.createOrder(UUID.fromString(request.getBuyerId()), request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderResponse> getOrder(@PathVariable UUID id) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.getOrder(id))
                .build();
    }
    
    @GetMapping("/user/{buyerId}")
    public ApiResponse<List<OrderResponse>> getOrdersByBuyer(@PathVariable UUID buyerId) {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getOrdersByBuyer(buyerId))
                .build();
    }
}
