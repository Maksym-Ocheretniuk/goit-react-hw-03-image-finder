import { Component } from 'react';
// import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

// import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputSearch: '',
  };

  handleInputChange = e => {
    this.setState({ inputSearch: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputSearch.trim() === '') {
      return toast.error('Hi :) input something for search');
    }
    this.props.onSubmit(this.state.inputSearch);
    this.setState({ inputSearch: '' });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <ImSearch />
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputSearch}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

// Searchbar.propTypes = {};
