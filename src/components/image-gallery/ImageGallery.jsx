import { forwardRef} from "react";
import { ImageGalleryItem } from '../image-gallery-item/ImageGalleryItem';
import { Grid } from './ImageGallery.styled';
import PropTypes from 'prop-types'; 

export const ImageGallery = forwardRef(({ images, onShowModal}, ref) => {

    return (
        <>
            <Grid ref={ref}>
                {images.map(image => <ImageGalleryItem onShowModal={onShowModal} image={image} key={image.id}/>)}     
            </Grid>
        </>
    );       
})

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.shape({
            id: PropTypes.string,
        })
    }))
}