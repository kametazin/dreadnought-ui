import { useState, useCallback } from 'react';
import { type ComponentMap, type FormField } from '../components/Form/types';

export type UseFormStateProps<T extends ComponentMap> = {
  fields: FormField<T>[];
  initialValues?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  onSuccess?: (values: Record<string, any>) => void;
  onError?: (error: any) => void;
};

export type UseFormStateReturn<T extends ComponentMap> = {
  values: Record<string, any>;
  globalError: any;
  handleFieldChange: (fieldName: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  getFieldProps: (field: FormField<T>) => { [key: string]: any; value: any; onChange: (value: any) => void };
};

export const useFormState = <T extends ComponentMap>({
  fields,
  initialValues = {},
  onSubmit,
  onSuccess,
  onError,
}: UseFormStateProps<T>): UseFormStateReturn<T> => {
  const collectedInitialValues = fields.reduce(
    (acc, field) => {
      // initialValues object takes precedence over field.value because it's more flexible and allows rewrite initial value in field
      acc[field.name] = initialValues[field.name] ?? field.value ?? undefined;
      return acc;
    },
    {} as Record<string, any>
  );

  const [values, setValues] = useState<Record<string, any>>(collectedInitialValues);
  const [globalError, setGlobalError] = useState<any>(undefined);

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setGlobalError(undefined);

      try {
        await onSubmit?.(values);
        onSuccess?.(values);
      } catch (error) {
        setGlobalError(error);
        onError?.(error);
      }
    },
    [onSubmit, onSuccess, onError, values]
  );

  const getFieldProps = useCallback(
    (field: FormField<T>): { [key: string]: any; value: any; onChange: (value: any) => void } => {
      return {
        ...field, // Pass all field properties to the component
        value: values[field.name] ?? '',
        onChange: (value: any) => handleFieldChange(field.name, value),
      };
    },
    [values, handleFieldChange]
  );

  return {
    values,
    globalError,
    handleFieldChange,
    handleSubmit,
    getFieldProps,
  };
};
