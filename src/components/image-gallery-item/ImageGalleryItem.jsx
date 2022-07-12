import { GridItem, GridImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types'; 


export const ImageGalleryItem = ({
    onShowModal,
    image }) => {

    return (
        <GridItem >
            <GridImg
                onClick={() => onShowModal(image.largeImageURL)}
                src={image.webformatURL} alt={image.tags}
                id={image.id} />
        </GridItem>
    );
}

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
    })
}