import { useState, useEffect, useLayoutEffect } from 'react';
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

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  // const [firstElOfPageId, setFirstElOfPageId] = useState('');

  useEffect(() => {
    
  async function getImages() {
    try {
        const {hits, totalHits} = await pixabayApiService.fetchImages();
        
        if (hits.length > 0) {
          setImages(prevState => [...prevState, ...hits]);
          setStatus('resolved');
          setTotalImages(totalHits);

      } else {
          setError(`There are no images with key word ${query}`);
          setStatus('rejected');
        }
      }
      catch (error){
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

  
  // const scrollToNextPage = () => {
  //   const headerHeight = 90;
  //   if (page > 1) {
  //     const firstElOnPagePos = document.getElementById(firstElOfPageId).offsetTop - headerHeight;
  //     window.scrollTo({
  //       top: firstElOnPagePos,
  //       behavior: 'smooth',
  // });
  //  }
  // };
  
  useLayoutEffect(() => {
    const CARD_HEIGHT = 260;

      window.scrollTo({
      //  top: document.documentElement.scrollHeight,
        top: CARD_HEIGHT * 2 * page,
        behavior: 'smooth',
      });
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
          <ImageGallery images={images} onShowModal={setSelectedImgUrl} />
          
        </>}
      {status === 'resolved' && Math.ceil(totalImages / PER_PAGE) !== page &&
        <Button onClick={() => setPage(prevState => prevState + 1)} /> }
        {selectedImgUrl.length > 0 && (
                 <Modal onClose={() => setSelectedImgUrl('')}>
                    <img src={selectedImgUrl} alt="" />
                 </Modal>
            )}
      </Container>
    )
}


