import { Component } from 'react';
import React from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../Api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };
  componentDidMount() {
    const parsedImages = JSON.parse(localStorage.getItem("images"));
    if (parsedImages !== null) {
      this.setState({ images: parsedImages });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.images !== prevState.images) {
      localStorage.setItem("images", JSON.stringify(this.state.images));
    }
  }


  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
            toast.error('Please enter a search term.');
            return;
        }
    const response = await fetchImages(inputForSearch.value, 1);
    this.setState({
      images: response,
      isLoading: false,
      currentSearch: inputForSearch.value,
      pageNr: 1,
    });
  };


  handleClickMore = async () => {
    const response = await fetchImages(
      this.state.currentSearch,
      this.state.pageNr + 1
    );
    this.setState({
      images: [...this.state.images, ...response],
      pageNr: this.state.pageNr + 1,
    });
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
       modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
         modalImg: '',
      modalAlt: '',
    });
  };



  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
   
          <React.Fragment>
          <Searchbar onSubmit={this.handleSubmit} />
           {this.state.isLoading ? (
          <Loader />
        ) : (
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={this.state.images}
            />
           )}
              
            {this.state.images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </React.Fragment>
    
        {this.state.modalOpen ? (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }
}