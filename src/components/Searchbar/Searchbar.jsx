import propTypes from 'prop-types';
import css from './Searchbar.module.css';
// import { Component } from 'react';
// import { toast } from 'react-toastify';

// export class Searchbar extends Component {
//   static propTypes = {
//     onSubmit: propTypes.func.isRequired,
//   };
//   state = {
//     currentSearch: '',
//   }
//    onChangeInput = e => {
//     this.setState({ currentSearch: e.currentTarget.value });
//   };

//   onSubmitForm = e => {
//     e.preventDefault();

//     const { onSubmit } = this.props;
//     const {currentSearch } = this.state;

//     if (currentSearch.trim() === '') {
//       toast.error('Enter a search term.');
//       return;
//     }
//      onSubmit(currentSearch);
//   };

//   render() {
//     const { currentSearch} = this.state;

//     return (
//       <header className={css.header}>
//         <form className={css.SearchForm} onSubmit={this.onSubmitForm}>
//           <button type="submit" className={css.SearchFormButton}>
//           <span className={css.SearchFormButtonLabel}>Search</span>
//          </button>


//           <input
//              className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={currentSearch}
//             onChange={this.onChangeInput}
//           />
//         </form>
//       </header>
//     );
//   }
// }



 export const Searchbar = ({ onSubmit }) => (
  <header className={css.Searchbar}>
    <form className={css.SearchForm} onSubmit={onSubmit}>
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
      />
    </form>
  </header>
);

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};