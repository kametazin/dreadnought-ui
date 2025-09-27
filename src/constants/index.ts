// Input type constants - logical values only
export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
  SEARCH: 'search',
} as const;

// Button type constants - logical values only
export const BUTTON_TYPES = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

// Currency symbols constants
export const DEFAULT_CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  UAH: '₴',
  RUB: '₽',
  BTC: '₿',
  ETH: 'Ξ',
} as const;

// Export type definitions based on constants
export type InputType = (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];
export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
