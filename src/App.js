import { Component } from "react";
import Searchbar from "./components/searchbar/searchbar";
import ImageGallery from "./components/imageGallery/imageGallery";
import "./App.css";

class App extends Component {
  state = {
    searchQuery: "",
  };

  handleSubmitSeachForm = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitSeachForm} />
        <ImageGallery searchQuery={searchQuery} />
      </div>
    );
  }
}

export default App;
