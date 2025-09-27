import { type ComponentType } from 'react';

// Base component interface that all form components must implement
export type FormFieldComponent = ComponentType<{
  value: any;
  onChange: (value: any) => void;
  [key: string]: any; // for additional props
}>;

// Component map type
export type ComponentMap = { [key: string]: FormFieldComponent };

// Generic FormField type
export type FormField<T extends ComponentMap> = {
  name: string;
  type: keyof T; // This constrains type to keys of the component map
  label?: string;
  required?: boolean;
  [key: string]: any; // for additional props for example options for select
};
