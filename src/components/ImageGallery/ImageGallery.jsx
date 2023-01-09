import { Component } from "react";
import { toast } from "react-toastify";
import propTypes from "prop-types";
import { fetchImages } from "../../Api/fetchImages";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import css from "./ImageGallery.module.css";

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export class ImageGallery extends Component {
  state = {
    imagesArray: [],
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.currentSearch;
    const nextName = this.props.currentSearch;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ imagesArray: [] });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ isLoading: true });
      fetchImages(nextName, nextPage).then(
        ({ hits: newImagesArray, totalHits: totalImages }) => {
          if (newImagesArray.length === 0 && totalImages === 0) {
            toast.error("Oops nothing found");
            this.setState({ isLoading: false });
            return;
          }
          if (newImagesArray.length === 0 && totalImages !== 0) {
            toast.warning("Nothing more found");
            this.setState({ isLoading: false });
            return;
          }
          if (nextPage === 1) {
            toast.success(`Found ${totalImages} images`);
            this.setState({ isLoading: false });
          }

          this.setState(({ imagesArray }) => ({
            imagesArray: [...imagesArray, ...newImagesArray],
            isLoading: false,
          }));
          console.log(this.state.imagesArray);
        }
      );
    }
  }

  handleClickMore = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { imagesArray, isLoading } = this.state;

     return (
      <>

        <ul className={css.ImageGallery}>
          {imagesArray.map((image) => (
            <ImageGalleryItem
              onclick={this.props.onImageClick}
              image={image}
              key={image.id}
            />
          ))}
         </ul>
            {isLoading && <Loader />}
        {imagesArray.length > 0 ? (
          <Button  onClick={this.handleClickMore} />
        ) : null}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
       })
  ),
  onImageClick: propTypes.func.isRequired,
};