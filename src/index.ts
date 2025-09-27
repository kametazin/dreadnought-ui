// Export all components
export { Input } from './components/Input';
export { Html5Select, CustomDropdownSelect } from './components/Select';
export { Button } from './components/Button';
export { Checkbox } from './components/Checkbox';
export { Form, ERROR_POSITION } from './components/Form';
export { FormattedAmount } from './components/FormattedAmount';

// Export hooks
export { useFormState } from './hooks/useFormState';
export { useOnClickOutside } from './hooks/useOnClickOutside';

// Export utilities
export { getCurrencySymbol } from './utils';

// Export logical constants only
export { INPUT_TYPES, BUTTON_TYPES, DEFAULT_CURRENCY_SYMBOLS } from './constants';

// Export constant types
export type { InputType, ButtonType } from './constants';

// Export component types from their respective component files
export type { InputProps } from './components/Input';
export type { Html5SelectProps, CustomDropdownSelectProps } from './components/Select';
export type { ButtonProps } from './components/Button';
export type { CheckboxProps } from './components/Checkbox';
export type { FormField, FormFieldComponent, ComponentMap, ButtonComponent, ErrorPosition } from './components/Form';
export type { FormattedAmountProps } from './components/FormattedAmount';

// Export shared types from types folder
export type { SelectOption, SelectOptions } from './types/select';
