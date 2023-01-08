import { Component } from "react";
import React from "react";

import { Searchbar } from "./Searchbar/Searchbar";
// import { fetchImages } from '../Api/fetchImages';
import { ImageGallery } from "./ImageGallery/ImageGallery";

// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';
import { Modal } from "./Modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class App extends Component {
  state = {
    currentSearch: "",
    modalOpen: false,
    modalImg: "",
    modalAlt: "",
  };

 

  handleSubmit = (currentSearch) => {
    this.setState({ currentSearch });
  };
 

  handleImageClick = (e) => {
    this.setState({
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: "",
      modalAlt: "",
    });
  };

  render() {
    const { currentSearch, modalImg, modalAlt, modalOpen } = this.state;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridGap: "16px",
          paddingBottom: "24px",
        }}
      >
        <React.Fragment>
          <Searchbar onSubmit={(e) => this.handleSubmit(e)} />
          <ImageGallery
            onImageClick={this.handleImageClick}
            currentSearch={currentSearch}
          />
        </React.Fragment>

        {modalOpen ? (
          <Modal
            src={modalImg}
            alt={modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}


