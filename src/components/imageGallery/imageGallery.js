import React, { Component } from "react";
import imageFinderApi from "../imagefinderApi";
import ImageGalleryItem from "./imageGalleryItem";
import BtnLoadMore from "../button/button";
import Spiner from "../spiner/spiner";
import Modal from "../modal/modal";

const status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGallery extends Component {
  state = {
    images: null,
    pageNumber: 1,
    showModal: false,
    largeImageURL: "",
    status: status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: status.PENDING });

      imageFinderApi(
        this.props.searchQuery,
        this.state.pageNumber
      ).then((images) =>
        this.setState({ images: images, status: status.RESOLVED })
      );
    }

    if (prevState.pageNumber !== this.state.pageNumber) {
      this.setState({ status: status.PENDING });

      imageFinderApi(this.props.searchQuery, this.state.pageNumber).then(
        (images) => {
          this.setState((prevState) => {
            return { images: [...prevState.images, ...images] };
          });
          this.setState({ status: status.RESOLVED });
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      );
    }
  }

  handleBtnClick = () => {
    this.setState((prevState) => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImageURL = (largeImageURL) => {
    this.toogleModal();
    this.setState({ largeImageURL });
  };

  render() {
    const { images, status, showModal, largeImageURL } = this.state;

    if (status === "idle") {
      return <div></div>;
    }

    if (status === "pending") {
      return (
        <div>
          <ul className="ImageGallery">
            {images && <ImageGalleryItem images={images} />}
          </ul>
          <Spiner />;
        </div>
      );
    }

    if (status === "resolved") {
      return (
        <div>
          <ul className="ImageGallery">
            <ImageGalleryItem
              images={images}
              getLargeImageURL={this.getLargeImageURL}
            />
          </ul>
          <BtnLoadMore onClick={this.handleBtnClick} />
          {showModal && (
            <Modal onClose={this.toogleModal} largeImageURL={largeImageURL} />
          )}
        </div>
      );
    }
  }
}
