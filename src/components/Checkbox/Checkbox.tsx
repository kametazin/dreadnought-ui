import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Checkbox.module.css';

export type CheckboxProps = {
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  value?: string;
  required?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  checkboxSize?: number;
  checkboxColor?: string;
  borderColor?: string;
  borderRadius?: number;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      onChange,
      className,
      label,
      labelPosition = 'right',
      checkboxSize = 18,
      checkboxColor = '#007bff',
      borderColor = '#ccc',
      borderRadius = 3,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked, event);
    };

    const customStyles = {
      '--checkbox-size': `${checkboxSize}px`,
      '--checkbox-color': checkboxColor,
      '--border-color': borderColor,
      '--border-radius': `${borderRadius}px`,
    } as React.CSSProperties;

    const labelElement = label && <span className={styles.label}>{label}</span>;

    return (
      <label className={classNames(styles.checkboxWrapper, className)} style={customStyles}>
        {labelPosition === 'left' && labelElement}
        <input ref={ref} type="checkbox" onChange={handleChange} className={styles.hiddenInput} {...props} />
        <span className={styles.customCheckbox}></span>
        {labelPosition === 'right' && labelElement}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
