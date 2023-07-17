import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { getImages } from 'api-service/getImages';

// import css from './App.module.css';

export class App extends Component {
  state = {
    inputSearch: '',
    hits: [],
    id: '',
    webformatURL: '',
    largeImageURL: '',
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    if (this.state.inputSearch !== prevState.inputSearch) {
      getImages(this.state.inputSearch)
        .then(res => res.json())
        .then(hits => this.setState(hits));
    }
  }

  handleFormSubmit = inputSearch => {
    this.setState({ inputSearch });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { hits } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <Loader />

        {hits && (
          <ImageGallery>
            <ImageGalleryItem images={hits} />
          </ImageGallery>
        )}

        <Button onBtnClick={() => this.handleLoadMore()} />

        <Modal />

        <ToastContainer autoClose={4000} theme="colored" />
      </div>
    );
  }
}

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
