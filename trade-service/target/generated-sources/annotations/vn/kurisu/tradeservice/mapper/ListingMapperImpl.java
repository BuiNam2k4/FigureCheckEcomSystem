package vn.kurisu.tradeservice.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import vn.kurisu.tradeservice.dto.request.ListingRequest;
import vn.kurisu.tradeservice.dto.response.ListingImageResponse;
import vn.kurisu.tradeservice.dto.response.ListingResponse;
import vn.kurisu.tradeservice.entity.Listing;
import vn.kurisu.tradeservice.entity.ListingImage;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-05T19:52:17+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class ListingMapperImpl implements ListingMapper {

    @Override
    public Listing toListing(ListingRequest request) {
        if ( request == null ) {
            return null;
        }

        Listing.ListingBuilder listing = Listing.builder();

        listing.condition( request.getCondition() );
        listing.description( request.getDescription() );
        listing.price( request.getPrice() );
        if ( request.getProductId() != null ) {
            listing.productId( UUID.fromString( request.getProductId() ) );
        }
        listing.quantity( request.getQuantity() );

        return listing.build();
    }

    @Override
    public ListingResponse toListingResponse(Listing listing) {
        if ( listing == null ) {
            return null;
        }

        ListingResponse.ListingResponseBuilder listingResponse = ListingResponse.builder();

        listingResponse.condition( listing.getCondition() );
        listingResponse.createdAt( listing.getCreatedAt() );
        listingResponse.description( listing.getDescription() );
        listingResponse.id( listing.getId() );
        listingResponse.images( listingImageListToListingImageResponseList( listing.getImages() ) );
        listingResponse.price( listing.getPrice() );
        listingResponse.productId( listing.getProductId() );
        listingResponse.quantity( listing.getQuantity() );
        listingResponse.status( listing.getStatus() );
        listingResponse.updatedAt( listing.getUpdatedAt() );
        listingResponse.userId( listing.getUserId() );

        return listingResponse.build();
    }

    @Override
    public ListingImageResponse toListingImageResponse(ListingImage listingImage) {
        if ( listingImage == null ) {
            return null;
        }

        ListingImageResponse.ListingImageResponseBuilder listingImageResponse = ListingImageResponse.builder();

        listingImageResponse.id( listingImage.getId() );
        listingImageResponse.imageUrl( listingImage.getImageUrl() );

        return listingImageResponse.build();
    }

    protected List<ListingImageResponse> listingImageListToListingImageResponseList(List<ListingImage> list) {
        if ( list == null ) {
            return null;
        }

        List<ListingImageResponse> list1 = new ArrayList<ListingImageResponse>( list.size() );
        for ( ListingImage listingImage : list ) {
            list1.add( toListingImageResponse( listingImage ) );
        }

        return list1;
    }
}
