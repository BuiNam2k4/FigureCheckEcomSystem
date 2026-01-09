package vn.kurisu.tradeservice.mapper;

import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.kurisu.tradeservice.dto.response.CartItemResponse;
import vn.kurisu.tradeservice.entity.CartItem;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-06T22:42:04+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class CartItemMapperImpl implements CartItemMapper {

    @Autowired
    private ListingMapper listingMapper;

    @Override
    public CartItemResponse toCartItemResponse(CartItem cartItem) {
        if ( cartItem == null ) {
            return null;
        }

        CartItemResponse.CartItemResponseBuilder cartItemResponse = CartItemResponse.builder();

        cartItemResponse.id( cartItem.getId() );
        cartItemResponse.userId( cartItem.getUserId() );
        cartItemResponse.listing( listingMapper.toListingResponse( cartItem.getListing() ) );
        cartItemResponse.createdAt( cartItem.getCreatedAt() );

        return cartItemResponse.build();
    }
}
