export function nFormatter(num: number, digits = 2) {
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return absNum >= item.value;
    });

  const formattedNum = item
    ? (absNum / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : absNum.toFixed(digits);

  return isNegative ? "-" + formattedNum : formattedNum;
}