import { ethers } from "ethers";
import SPUNKYABI from "../ABI/SSDX.json";

export const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/063a60c10ac741779bd263e121f5148f"
);

export const contractMap = {
  "1": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "56": "0x55d398326f99059fF775485246999027B3197955",
  "42161": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  "11155111": "0x118E057f72BEA13b6bEFB22525478d3AeA644D49",
} as Record<string, string>;

// const CONTRACT_ADDRESS = "0x0AE04f70b2Fab115b51d7Ea74f484B9cf301Ba13";

export const contract = (chain = "11155111") =>
  new ethers.Contract(contractMap[chain], SPUNKYABI, provider);

// console.log(contract);

export const getPresaleAllocation = async (chain: string) => {
  if (!provider) return;
  const transaction = await contract(chain).getPresaleAllocation();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  return result;
};

export const getTotalSupply = async (chain: string) => {
  if (!provider) return;
  const transaction = await contract(chain).getSupply();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  return result;
};

export const getPresaleState = async (chain: string) => {
  if (!provider) return;
  const transaction = await contract(chain).getPresaleState();
  return transaction;
};

export const getEthPrice = async (chain: string) => {
  if (!provider) return;
  const transaction = await contract(chain).getETHPrice();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  return result;
};
