import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./button.module.css";

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  backgroundColor,
  size,
  children,
  ...props
}) => {
  const mode = primary ? styles.primary : styles.secondary;
  return (
    <button
      type="button"
      className={clsx(styles.button, styles[size], mode)}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onClick: undefined,
};
