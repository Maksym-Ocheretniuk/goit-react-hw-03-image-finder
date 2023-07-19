// import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(({ id, webformatURL, tags }) => {
        return (
          <li key={id}>
            <img src={webformatURL} alt={tags} />
          </li>
        );
      })}
    </>
  );
};
