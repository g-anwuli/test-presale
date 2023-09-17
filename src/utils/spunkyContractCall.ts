import { ethers } from "ethers";
import SPUNKYABI from "../ABI/SSDX.json";

export const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/063a60c10ac741779bd263e121f5148f"
);

export const contractMap = {
  "1": "0x73F5E354d0570475D0559C9E66de8d22c3f793a9",
  "56": "0x532a437c55b8db5D08ecA1d0C762fE6a2f414F5C",
  "42161": "0x73F5E354d0570475D0559C9E66de8d22c3f793a9",
  "11155111": "0xfac95691a6153Fe405D0E01B2329AB34693ef1bF",
} as Record<string, string>;


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
