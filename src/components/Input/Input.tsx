import React, { forwardRef, useCallback } from 'react';
import classNames from 'classnames';
import type { InputType } from '../../constants';
import { INPUT_TYPES } from '../../constants';
import styles from './Input.module.css';

export type InputProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  containerClassName?: string;
  labelClassName?: string;
  className?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  content?: React.ReactNode;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  focusOnLabelClick?: boolean;
  onLabelClick?: React.ReactEventHandler;
  type?: InputType;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  id?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      name,
      label,
      className,
      containerClassName,
      labelClassName,
      autoFocus,
      content,
      onFocus,
      onBlur,
      focusOnLabelClick = true,
      onLabelClick,
      type = INPUT_TYPES.TEXT,
      placeholder,
      ...props
    },
    ref
  ) => {
    const onClickLabel = useCallback(
      function (event: React.MouseEvent) {
        if (onLabelClick) {
          onLabelClick(event);
          return;
        }

        if (focusOnLabelClick && ref && typeof ref !== 'function') {
          ref.current?.focus();
        }
      },
      [onLabelClick, focusOnLabelClick, ref]
    );

    return (
      <label className={classNames(styles.inputContainer, containerClassName)}>
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          className={classNames(styles.input, className)}
          name={name}
          autoFocus={autoFocus}
          {...props}
        />
        {content}

        {label && (
          <span className={classNames(styles.label, labelClassName)} onClick={onClickLabel}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Input.displayName = 'Input';
