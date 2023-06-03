import { utils, ethers, BigNumber, constants } from "ethers";

export * from "./token";
export * from "./poolFactory";
export * from "./pool";

// Truncate the input string to 8 characters and add ellipsis in the middle
export const truncateAddress = (str: string): string => {
  if (str.length <= 8) {
    return str;
  }
  const start = str.substring(0, 4);
  const end = str.substring(str.length - 4);
  return `${start}...${end}`;
};

// Format the input value of an event's target element to a float with two decimal places
export const formatInputFloat = (event: any) => {
  const regex = /^[0-9]+(\.[0-9]{0,2})?$/;
  const value = event.target.value;
  if (regex.test(value)) {
    event.target.value = value;
  } else {
    const floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
      const roundedValue = floatValue.toFixed(2);
      event.target.value = roundedValue;
    } else {
      event.target.value = Number(0).toFixed(2);
    }
  }
};

export function isValidEthAddress(input: string): boolean {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(input);
}
