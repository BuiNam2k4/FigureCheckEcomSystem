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
    date = "2026-01-06T22:42:03+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class ListingMapperImpl implements ListingMapper {

    @Override
    public Listing toListing(ListingRequest request) {
        if ( request == null ) {
            return null;
        }

        Listing.ListingBuilder listing = Listing.builder();

        if ( request.getProductId() != null ) {
            listing.productId( UUID.fromString( request.getProductId() ) );
        }
        listing.price( request.getPrice() );
        listing.quantity( request.getQuantity() );
        listing.condition( request.getCondition() );
        listing.description( request.getDescription() );

        return listing.build();
    }

    @Override
    public ListingResponse toListingResponse(Listing listing) {
        if ( listing == null ) {
            return null;
        }

        ListingResponse.ListingResponseBuilder listingResponse = ListingResponse.builder();

        listingResponse.id( listing.getId() );
        listingResponse.userId( listing.getUserId() );
        listingResponse.productId( listing.getProductId() );
        listingResponse.price( listing.getPrice() );
        listingResponse.quantity( listing.getQuantity() );
        listingResponse.condition( listing.getCondition() );
        listingResponse.description( listing.getDescription() );
        listingResponse.status( listing.getStatus() );
        listingResponse.images( listingImageListToListingImageResponseList( listing.getImages() ) );
        listingResponse.createdAt( listing.getCreatedAt() );
        listingResponse.updatedAt( listing.getUpdatedAt() );

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
