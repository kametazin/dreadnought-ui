import React, { forwardRef } from 'react';
import classNames from 'classnames';
import type { ButtonType } from '../../constants';
import { BUTTON_TYPES } from '../../constants';
import styles from './Button.module.css';

export type ButtonProps = {
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  name?: string;
  id?: string;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  autoFocus?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = BUTTON_TYPES.BUTTON, children, className, ...props }, ref) => {
    return (
      <button ref={ref} type={type} className={classNames(styles.button, className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
