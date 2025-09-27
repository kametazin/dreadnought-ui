import { DEFAULT_CURRENCY_SYMBOLS } from '../constants';

export const getCurrencySymbol = (
  currency: string,
  customSymbol?: string,
  symbolMap?: Record<string, string>
): string => {
  if (customSymbol) return customSymbol;
  const symbols = { ...DEFAULT_CURRENCY_SYMBOLS, ...symbolMap };
  return symbols[currency] || currency;
};