import propTypes from "prop-types";
import css from "./Button.module.css";

export const Button = ({ onClick, isDisabled }) => (
  <button
    className={css.Button}
    onClick={onClick}
    type="button"
    disabled={isDisabled}
  >
    Load more
  </button>
);
Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

