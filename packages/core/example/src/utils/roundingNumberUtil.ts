export const roundingNumber = (value: string | number | null, maxDecimal = 2) => {
  const formattedValue = Number(value || 0);

  if (formattedValue < 10000) {
    const parseValue = parseFloat(formattedValue.toFixed(maxDecimal));

    return parseValue.toString().replace(/^[+-]?\d+/, function (number) {
      return number.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    });
  }

  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: maxDecimal,
  }).format(formattedValue);
};
