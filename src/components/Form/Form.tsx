import React, { type ComponentType } from 'react';
import { type ComponentMap, type FormField } from './types';
import { useFormState } from '../../hooks/useFormState';

export const ERROR_POSITION = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type ErrorPosition = typeof ERROR_POSITION[keyof typeof ERROR_POSITION];

export type ButtonComponent = ComponentType<{
  type?: 'submit' | 'button' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  [key: string]: any;
}>;

type ErrorRendererProps = {
  error: any;
};

type FormProps<T extends ComponentMap> = {
  fields: FormField<T>[];
  components: T;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  onSuccess?: (values: Record<string, any>) => void;
  onError?: (error: any) => void;
  errorRenderer?: (props: ErrorRendererProps) => React.ReactNode;
  errorPosition?: ErrorPosition;
  initialValues?: Record<string, any>;
  ButtonComponent?: ButtonComponent;
  buttonProps?: Record<string, any>;
};

// Default button component fallback
const DefaultButton: ButtonComponent = ({ children = 'Submit', ...props }) => <button {...props}>{children}</button>;

// Default error renderer
const defaultErrorRenderer = ({ error }: ErrorRendererProps): React.ReactNode => {
  if (typeof error === 'string') {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (typeof error === 'object' && error !== null) {
    const message = error.message || error.text || 'Unknown error';
    return <div style={{ color: 'red' }}>{message}</div>;
  }

  return <div style={{ color: 'red' }}>Unknown error</div>;
};

export const Form = <T extends ComponentMap>({
  fields,
  components,
  onSubmit,
  onSuccess,
  onError,
  errorRenderer = defaultErrorRenderer,
  errorPosition = ERROR_POSITION.BOTTOM,
  initialValues = {},
  ButtonComponent = DefaultButton,
  buttonProps = {},
}: FormProps<T>) => {
  const { handleSubmit, getFieldProps, globalError } = useFormState({
    fields,
    initialValues,
    onSubmit,
    onSuccess,
    onError,
  });

  const errorElement = globalError ? errorRenderer({ error: globalError }) : null;

  return (
    <form onSubmit={handleSubmit}>
      {errorPosition === ERROR_POSITION.TOP && errorElement}
      {fields.map(field => {
        const Component = components[field.type];
        const componentProps = getFieldProps(field);

        return <div key={field.name}>{React.createElement(Component, componentProps)}</div>;
      })}
      <ButtonComponent type="submit" {...buttonProps}>
        {buttonProps?.children || 'Submit'}
      </ButtonComponent>
      {errorPosition === ERROR_POSITION.BOTTOM && errorElement}
    </form>
  );
};
