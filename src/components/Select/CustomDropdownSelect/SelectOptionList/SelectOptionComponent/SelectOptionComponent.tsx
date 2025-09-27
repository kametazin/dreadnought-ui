import classNames from 'classnames';
import { type FC, type ReactEventHandler, type ReactNode } from 'react';

import styles from './SelectOptionComponent.module.css';

type SelectOptionComponentProps = {
  onClick?: ReactEventHandler
  className?: string
  children?: ReactNode
}

const SelectOptionComponent: FC<SelectOptionComponentProps> = ({
  onClick,
  className,
  children
}) => {
  return (
    <div
      className={classNames(styles.selectOption, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SelectOptionComponent;
