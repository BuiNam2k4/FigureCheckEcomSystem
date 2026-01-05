package vn.kurisu.tradeservice.mapper;

import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.kurisu.tradeservice.dto.response.CartItemResponse;
import vn.kurisu.tradeservice.entity.CartItem;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-05T19:52:17+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
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

        cartItemResponse.createdAt( cartItem.getCreatedAt() );
        cartItemResponse.id( cartItem.getId() );
        cartItemResponse.listing( listingMapper.toListingResponse( cartItem.getListing() ) );
        cartItemResponse.userId( cartItem.getUserId() );

        return cartItemResponse.build();
    }
}
