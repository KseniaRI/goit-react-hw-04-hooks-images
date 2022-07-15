import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { PixabayApiService } from '../../services/pixabay-api';
import { Searchbar } from '../searchbar/Searchbar';
import { ImageGallery } from '../image-gallery/ImageGallery';
import { Container } from './App.styled';
import { Message } from '../message/Message';
import { Loader } from '../loader/Loader';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';

const PER_PAGE = 12;
const pixabayApiService = new PixabayApiService(); 

export const App = () => {

  const galleryRef = useRef();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [selectedImgUrl, setSelectedImgUrl] = useState('');

  useEffect(() => {
    
    async function getImages() {
      try {
        const { hits, totalHits } = await pixabayApiService.fetchImages();
        
        if (hits.length > 0) {
          setImages(prevState => [...prevState, ...hits]);
          setStatus('resolved');
          setTotalImages(totalHits);
        } else {
          setError(`There are no images with key word ${query}`);
          setStatus('rejected');
        }
      }
      catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }

    if (query !== '') {
    
      setStatus('pending');
      pixabayApiService.query = query;
      pixabayApiService.page = page;
      
      getImages();
    }
  }, [query, page]);

  useLayoutEffect(() => {
    
    function slowScroll() {
      if (page > 1) {
        console.log(galleryRef.current.firstChild.getBoundingClientRect());
        const { height: cardHeight } = galleryRef.current.firstChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 3 * page,
          behavior: 'smooth',
        })
      }
    }
    
    document.addEventListener("scroll", slowScroll);

    //     window.scrollTo({
    //      top: document.documentElement.scrollHeight,
    //       behavior: 'smooth',
    //     });
  });

    const formSubmitHandler = ({ query }, { resetForm }) => {
      setPage(1);
      setQuery(query);
      setImages([]);

      resetForm();
    }
    
    return (
      <Container>
        <Searchbar onSubmit={formSubmitHandler} />
        {status === 'idle' && <Message text="Enter something..." />}
        {status === 'rejected' && <Message text={error} />}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <>
          <ImageGallery ref={galleryRef} images={images} onShowModal={setSelectedImgUrl} />
          
        </>}
        {status === 'resolved' && Math.ceil(totalImages / PER_PAGE) !== page &&
          <Button onClick={() => setPage(prevState => prevState + 1)} />}
        {selectedImgUrl.length > 0 && (
          <Modal onClose={() => setSelectedImgUrl('')}>
            <img src={selectedImgUrl} alt="" />
          </Modal>
        )}
      </Container>
    )
}


