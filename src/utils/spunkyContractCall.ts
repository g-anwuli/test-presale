import { ethers } from "ethers";
import SPUNKYABI from "../ABI/SSDX.json";

export const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/063a60c10ac741779bd263e121f5148f"
);

const CONTRACT_ADDRESS = "0x84cAA61a7199E807A54Ca82D014de8EBDc355b46";

export const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  SPUNKYABI,
  provider
);

// console.log(contract);

export const getPresaleAllocation = async () => {
  if (!provider) return;
  const transaction = await contract.getPresaleAllocation();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  return result;
};

export const getTotalSupply = async () => {
  if (!provider) return;
  const transaction = await contract.getSupply();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  return result;
};

export const getPresaleState = async () => {
  if (!provider) return;
  const transaction = await contract.getPresaleState();
  return transaction;
};

export const getEthPrice = async () => {
  if (!provider) return;
  const transaction = await contract.getETHPrice();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  return result;
};
