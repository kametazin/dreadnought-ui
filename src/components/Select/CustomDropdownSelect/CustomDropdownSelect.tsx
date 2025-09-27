import classNames from 'classnames';
import React, { type FC, useMemo, useRef, useState, forwardRef } from 'react';

import SelectOptionComponent from './SelectOptionList/SelectOptionComponent/SelectOptionComponent';
import SelectOptionList from './SelectOptionList/SelectOptionList';
import { type SelectOptions , type SelectOption } from '../../../types/select';

import styles from './CustomDropdownSelect.module.css';

export type CustomDropdownSelectProps = {
  label?: string;
  labelClassName?: string;
  options: SelectOptions;
  value?: string;
  showStar?: boolean;
  required?: boolean;
  showRequiredStar?: boolean;
  onChange: (value: any) => void;
  OptionComponent?: FC<{ option: SelectOption }>;
  className?: string;
}

export const CustomDropdownSelect = forwardRef<HTMLDivElement, CustomDropdownSelectProps>(({
  label,
  labelClassName,
  options,
  value,
  showStar,
  required,
  showRequiredStar,
  onChange,
  OptionComponent,
  className,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // Simple click outside handler
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClickOutside();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [isOpen]);

  const selectedOption = useMemo(() => {
    return options.find((option:SelectOption) => option.value === value);
  }, [value, options]);

  React.useImperativeHandle(ref, () => containerRef.current!);

  return (
    <div ref={containerRef} className={classNames(styles.selectContainer, isOpen && styles.open, className)}>
      {label && (
        <label className={classNames(styles.label, labelClassName)}>
          {label}
          {(showStar || required || showRequiredStar) && <span className={styles.requiredStar}>*</span>}
        </label>
      )}
      <SelectOptionComponent
        className={styles.selectValue}
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        {selectedOption && (OptionComponent ? <OptionComponent option={selectedOption} /> : selectedOption.text)}
        <div className={classNames('icon-angle-down', styles.selectArrow)}></div>
      </SelectOptionComponent>
      {isOpen && (
        <SelectOptionList
          OptionComponent={OptionComponent}
          options={options}
          onSelectOption={(option:SelectOption) => {
            onChange(option.value);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
});

CustomDropdownSelect.displayName = 'CustomDropdownSelect';
