function roundUpToDecimal(number: number, decimalPlaces: number) {
  const factor = 10 ** decimalPlaces;
  return Math.ceil(number * factor) / factor;
}

export default roundUpToDecimal;
