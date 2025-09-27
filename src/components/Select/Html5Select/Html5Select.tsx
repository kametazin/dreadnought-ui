import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { type SelectOption } from '../../../types/select';
import styles from './Html5Select.module.css';

export type Html5SelectProps = {
  className?: string;
  options: SelectOption[];
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  showRequiredStar?: boolean;
  onChange?: (value: any, event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
  multiple?: boolean;
};

export const Html5Select = forwardRef<HTMLSelectElement, Html5SelectProps>(
  ({ options, onChange, placeholder, className, label, labelClassName, required, showRequiredStar, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = options.find(opt => String(opt.value) === event.target.value);
      onChange?.(selectedOption?.value, event);
    };

    const labelElement = label && (
      <label className={classNames(styles.label, labelClassName)}>
        {label}
        {(required || showRequiredStar) && <span className={styles.requiredStar}>*</span>}
      </label>
    );

    return (
      <div className={styles.selectWrapper}>
        {labelElement}
        <select
          ref={ref}
          onChange={handleChange}
          className={classNames(styles.select, className)}
          required={required}
          {...props}
          value={props.value !== undefined ? String(props.value) : undefined}
          defaultValue={props.defaultValue !== undefined ? String(props.defaultValue) : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Html5Select.displayName = 'Html5Select';
