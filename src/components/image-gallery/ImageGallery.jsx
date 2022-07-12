import { ImageGalleryItem } from '../image-gallery-item/ImageGalleryItem';
import { Grid } from './ImageGallery.styled';
import PropTypes from 'prop-types'; 

export const ImageGallery = ({ images, onShowModal}) => {

    return (
        <>
            <Grid>
                {images.map(image => <ImageGalleryItem onShowModal={onShowModal} image={image} key={image.id}/>)}     
            </Grid>
        </>
    );       
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.shape({
            id: PropTypes.string,
        })
    }))
}