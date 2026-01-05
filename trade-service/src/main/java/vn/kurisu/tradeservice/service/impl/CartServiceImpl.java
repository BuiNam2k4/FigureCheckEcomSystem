package vn.kurisu.tradeservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.kurisu.tradeservice.dto.request.CartItemRequest;
import vn.kurisu.tradeservice.dto.response.CartItemResponse;
import vn.kurisu.tradeservice.entity.CartItem;
import vn.kurisu.tradeservice.entity.Listing;
import vn.kurisu.tradeservice.exception.AppException;
import vn.kurisu.tradeservice.exception.ErrorCode;
import vn.kurisu.tradeservice.mapper.CartItemMapper;
import vn.kurisu.tradeservice.repository.CartItemRepository;
import vn.kurisu.tradeservice.repository.ListingRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements vn.kurisu.tradeservice.service.CartService {
    private final CartItemRepository cartItemRepository;
    private final ListingRepository listingRepository;
    private final CartItemMapper cartItemMapper;

    @Override
    public CartItemResponse addToCart(UUID userId, CartItemRequest request) {
        UUID listingId = UUID.fromString(request.getListingId());
        
        // Check if already in cart
        if (cartItemRepository.findByUserIdAndListingId(userId, listingId).isPresent()) {
             throw new RuntimeException("Item already in cart"); // Custom exception better
        }

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new AppException(ErrorCode.LISTING_NOT_FOUND));

        CartItem cartItem = CartItem.builder()
                .userId(userId)
                .listing(listing)
                .build();

        return cartItemMapper.toCartItemResponse(cartItemRepository.save(cartItem));
    }

    @Override
    public List<CartItemResponse> getCart(UUID userId) {
        return cartItemRepository.findByUserId(userId).stream()
                .map(cartItemMapper::toCartItemResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}
