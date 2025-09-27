import classNames from 'classnames';
import { type FC } from 'react';
import SelectOptionComponent from './SelectOptionComponent/SelectOptionComponent';
import { type SelectOption, type SelectOptions } from '../../../../types/select';

import styles from './SelectOptionList.module.css';

type SelectOptionListProps = {
  options: SelectOptions
  onSelectOption: (option:SelectOption) => void
  className?: string,
  OptionComponent?: FC<{ option: SelectOption }>,
}

const SelectOptionList: FC<SelectOptionListProps> = ({
  options,
  onSelectOption,
  className,
  OptionComponent,
}) => {

  return (
    <div className={classNames(styles.selectOptionList, className)}>
      {options.map((option) => {
        return (
          <SelectOptionComponent
            key={`option-${option.value}`}
            onClick={() => {
              onSelectOption(option);
            }}
            className={styles.listOption}
          >
            {OptionComponent ? <OptionComponent option={option} /> : option.text}
          </SelectOptionComponent>
        );
      })}
    </div>
  );
};

export default SelectOptionList;
