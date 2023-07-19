import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onImageClick }) => {
  return (
    <>
      {images.map(({ id, webformatURL, tags }) => {
        return (
          <li key={id} className={css.imageGalleryItem}>
            <img
              src={webformatURL}
              alt={tags}
              onClick={() => onImageClick(webformatURL)}
              className={css.imageGalleryItemImg}
            />
          </li>
        );
      })}
    </>
  );
};
