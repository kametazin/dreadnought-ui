import { getCurrencySymbol } from '../../utils';

export type FormattedAmountProps = {
  amount: string | number;
  currency?: string;
  className?: string;
  showCurrencySymbol?: boolean;
  customCurrencySymbol?: string;
  decimalPlaces?: number;
  currencySymbolMap?: Record<string, string>;
};

export const FormattedAmount = ({
  amount,
  currency,
  className,
  showCurrencySymbol = true,
  customCurrencySymbol,
  decimalPlaces = 2,
  currencySymbolMap,
}: FormattedAmountProps) => {
  const formatAmount = (value: string | number): string => {
    const numValue = Number(value) || 0;
    return numValue.toFixed(decimalPlaces);
  };

  const formattedAmount = formatAmount(amount);

  if (!currency) {
    return <span className={className}>{formattedAmount}</span>;
  }

  if (!showCurrencySymbol) {
    return <span className={className}>{`${formattedAmount} ${currency}`}</span>;
  }

  const currencySymbol = getCurrencySymbol(currency, customCurrencySymbol, currencySymbolMap);
  return <span className={className}>{`${currencySymbol}${formattedAmount}`}</span>;
};
