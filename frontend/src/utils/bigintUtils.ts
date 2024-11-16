/**
 * Converts a formatted string (e.g., "123.456") to BigInt with the specified number of decimals
 * @param formattedString - The string to convert (e.g., "123.456")
 * @param decimals - Number of decimal places (e.g., 6 for USDC)
 * @returns BigInt value with the correct number of decimals
 */
export function formattedStringToBigInt(formattedString: string, decimals: number): bigint {
  // Handle empty or invalid input
  if (!formattedString || isNaN(Number(formattedString))) {
    return 0n;
  }

  // Split the string into integer and decimal parts
  const [integerPart, decimalPart = ""] = formattedString.split(".");

  // Pad or truncate decimal part to match decimals
  const paddedDecimal = decimalPart.padEnd(decimals, "0").slice(0, decimals);

  // Combine parts and convert to BigInt
  const combinedString = `${integerPart}${paddedDecimal}`;
  return BigInt(combinedString);
}

/**
 * Converts a BigInt value to a formatted string with the specified number of decimals
 * @param value - The BigInt value to convert
 * @param decimals - Number of decimal places
 * @param maxDecimals - Optional maximum number of decimals to display (will trim trailing zeros)
 * @returns Formatted string representation
 */
export function bigIntToFormattedString(value: bigint, decimals: number, maxDecimals?: number): string {
  if (value === 0n) return "0";

  const stringValue = value.toString().padStart(decimals + 1, "0");
  const integerPart = stringValue.slice(0, -decimals) || "0";
  const decimalPart = stringValue.slice(-decimals);

  // Trim trailing zeros if maxDecimals is specified
  const formattedDecimal =
    maxDecimals !== undefined ? decimalPart.slice(0, maxDecimals).replace(/0+$/, "") : decimalPart.replace(/0+$/, "");

  return formattedDecimal ? `${integerPart}.${formattedDecimal}` : integerPart;
}
