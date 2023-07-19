import { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
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
    loading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { inputSearch, page } = this.state;

    if (inputSearch !== prevState.inputSearch || page !== prevState.page) {
      this.setState({ loading: true });

      getImages(inputSearch, page)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`No ${inputSearch}`));
        })
        .then(data => {
          if (!data.totalHits) {
            return toast.error(`No pictures for ${inputSearch}`);
          }

          const totalPages = Math.ceil(data.totalHits / 12);

          if (page === totalPages) {
            this.setState({ endOfCollection: true });
            return toast.error('No more pictures');
          }

          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits],
            endOfCollection: false,
          }));
        })
        .catch(error => {
          console.log(error);
          return toast.error(`Something wrong`);
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = inputSearch => {
    this.setState({ inputSearch });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { hits, loading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <Loader />

        {hits && (
          <ImageGallery>
            <ImageGalleryItem images={hits} />
          </ImageGallery>
        )}

        {hits.length > 0 && <Button onBtnClick={() => this.handleLoadMore()} />}

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
