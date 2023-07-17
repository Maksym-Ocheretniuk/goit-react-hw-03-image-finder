// import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(({ id, webformatURL }) => {
        return (
          <li key={id}>
            <img src={webformatURL} alt="something of search" />
          </li>
        );
      })}
    </>
  );
};
