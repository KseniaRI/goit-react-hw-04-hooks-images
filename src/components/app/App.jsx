import { Component } from 'react';
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

export class App extends Component{
  state = {
    page: 1,
    query: '',
    error: '',
    images: [],
    totalImages: 0,
    status: 'idle',
    selectedImgUrl: '',
    firstElOfPageId: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;
    const prevPage = prevState.page;
    const currentPage = this.state.page;
        
        if (prevQuery !== newQuery || prevPage !== currentPage) {

            this.setState({ status: 'pending' });

            pixabayApiService.query = newQuery;
            pixabayApiService.page = currentPage;

            pixabayApiService.fetchImages().then(responce => {
              if (responce.hits.length > 0) {
                  this.setState(prevState => ({ images: [...prevState.images, ...responce.hits], status: 'resolved', firstElOfPageId: responce.hits[0].id, totalImages: responce.totalHits  }), this.scrollToNextPage);
                    // window.scrollByPages(currentPage) ;
                } else {
                    this.setState({ error: `There are no images with key word ${newQuery}`, status: 'rejected'})
                }
            }).catch(error => this.setState({ error: error.message, status: 'rejected' }));
        }
  }

  scrollToNextPage = () => {
    const headerHeight = 90;
    if (this.state.page > 1) {
      const firstElOnPagePos = document.getElementById(this.state.firstElOfPageId).offsetTop - headerHeight;
      window.scrollTo({
      // top: document.documentElement.scrollHeight,
        top: firstElOnPagePos,
        behavior: 'smooth',
  });
   }
};

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, }), );
  }
  
    onShowModal = (lageImageUrl) => {
       this.setState({
           selectedImgUrl: lageImageUrl,
        });
    }

    onCloseModal = () => {
        this.setState({
            selectedImgUrl: '',
        })
    }
    handleSelectedImg(url) {
        
        this.setState({ selectedImgUrl: url });
    }

  formSubmitHandler = ({query}, { resetForm }) => {
    this.setState({
      page: 1,
      query,
      images: [],
    });
     resetForm();
  }

  render() {
    const { images, error, page, status, totalImages, selectedImgUrl } = this.state; 
    
    return (
      <Container>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {status === 'idle' && <Message text="Enter something..." />}
        {status === 'rejected' && <Message text={error} />}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <>
          <ImageGallery firstImgOnPageId={this.firstImgOnPageId} images={images} onShowModal={this.onShowModal} />
          
        </>}
        {status === 'resolved' && Math.ceil(totalImages / PER_PAGE) !== page && <Button onClick={this.onLoadMore} />}
        {selectedImgUrl.length > 0 && (
                 <Modal onClose={this.onCloseModal}>
                    <img src={selectedImgUrl} alt="" />
                 </Modal>
            )}
      </Container>
    )
  }
};

