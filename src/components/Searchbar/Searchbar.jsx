import propTypes from 'prop-types';
import css from './Searchbar.module.css';
import { Component } from "react";

import { toast } from "react-toastify";

export class Searchbar extends Component {
  state = {
    currentSearch: "",
  };

  handleNameChange = (e) => {
    this.setState({ currentSearch: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.currentSearch.trim() === "") {
      toast.warning("Enter sth");
      return;
    }

    this.props.onSubmit(this.state.currentSearch);
    this.setState({ currentSearch: "" });
  };

  render() {
    const { currentSearch } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            name="inputForSearch"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={currentSearch}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};
