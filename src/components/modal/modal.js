// // import * as basicLightbox from "basiclightbox";

// export default function openModal(evt) {
//   evt.preventDefault();

//   if (evt.target.nodeName !== "IMG") {
//     return;
//   }

//   return (
//     <div className="Overlay">
//       <div className="Modal">
//         <img src="{evt.target.dataset.src}" alt="{evt.target.alt}" />
//       </div>
//     </div>
//   );
// }

import React, { Component } from "react";
import { createPortal } from "react-dom";
// import "./Modal.scss";
// import IconButton from "../IconButton/IconButton";
// import { ReactComponent as CloseIcon } from "../../icons/close.svg";

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handelBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handelBackdropClick}>
        <div className="Modal">
          <a href={this.props.largeImageURL}>
            <img src={this.props.largeImageURL} alt="" />
          </a>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  }
}
