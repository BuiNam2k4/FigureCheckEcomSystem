package vn.kurisu.tradeservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.kurisu.tradeservice.dto.request.OrderRequest;
import vn.kurisu.tradeservice.dto.response.OrderResponse;
import vn.kurisu.tradeservice.entity.Listing;
import vn.kurisu.tradeservice.entity.Order;
import vn.kurisu.tradeservice.entity.OrderItem;
import vn.kurisu.tradeservice.exception.AppException;
import vn.kurisu.tradeservice.exception.ErrorCode;
import vn.kurisu.tradeservice.mapper.OrderMapper;
import vn.kurisu.tradeservice.repository.ListingRepository;
import vn.kurisu.tradeservice.repository.OrderRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements vn.kurisu.tradeservice.service.OrderService {
    private final OrderRepository orderRepository;
    private final ListingRepository listingRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional
    public OrderResponse createOrder(UUID buyerId, OrderRequest request) {
        Order order = new Order();
        order.setBuyerId(buyerId);
        order.setShippingAddress(request.getShippingAddress());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus("PENDING");

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (String listingIdStr : request.getListingIds()) {
            UUID listingId = UUID.fromString(listingIdStr);
            Listing listing = listingRepository.findById(listingId)
                    .orElseThrow(() -> new AppException(ErrorCode.LISTING_NOT_FOUND));
            
            // Check status, assume AVAILABLE
            
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .listingId(listing.getId())
                    .sellerId(listing.getUserId())
                    .productName("Product " + listing.getProductId()) // Should call Product Service
                    .productImageUrl(listing.getImages().isEmpty() ? "" : listing.getImages().get(0).getImageUrl())
                    .price(listing.getPrice())
                    .build();
            
            orderItems.add(orderItem);
            totalAmount = totalAmount.add(listing.getPrice());
            
            // Update listing status?
            listing.setStatus("LOCKED");
            listingRepository.save(listing);
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);
        
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toOrderResponse(savedOrder);
    }

    @Override
    public OrderResponse getOrder(UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return orderMapper.toOrderResponse(order);
    }

    @Override
    public List<OrderResponse> getOrdersByBuyer(UUID buyerId) {
        return orderRepository.findByBuyerId(buyerId).stream()
                .map(orderMapper::toOrderResponse)
                .collect(Collectors.toList());
    }
}
