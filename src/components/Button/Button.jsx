import PropTypes from 'prop-types';
// import css from './Button.module.css';

export const Button = ({ onBtnClick }) => {
  return (
    <div>
      <button type="button" onClick={onBtnClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
