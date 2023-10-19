import { ethers } from "ethers";
import SPUNKYABI from "../ABI/SSDX.json";

export const providerMap = {
  "1": "https://mainnet.infura.io/v3/063a60c10ac741779bd263e121f5148f",
  "56": "https://bsc-dataseed.bnbchain.org",
  "42161":
    "https://arbitrum-mainnet.infura.io/v3/063a60c10ac741779bd263e121f5148f",
  "11155111": "https://sepolia.infura.io/v3/063a60c10ac741779bd263e121f5148f",
} as Record<string, string>;

export const contractMap = {
  "1": "0x73F5E354d0570475D0559C9E66de8d22c3f793a9",
  "56": "0x532a437c55b8db5D08ecA1d0C762fE6a2f414F5C",
  "42161": "0x73F5E354d0570475D0559C9E66de8d22c3f793a9",
  "11155111": "0xc74303DE35Fabec349aaFdc7346ca2d2f1ab4726",
} as Record<string, string>;

export const contract = (chain = "11155111") => {
  const provider = new ethers.providers.JsonRpcProvider(providerMap[chain]);
  return new ethers.Contract(contractMap[chain], SPUNKYABI, provider);
};

// console.log(await contract().presaleStarted());


export const getTokenSold = async (chain: string) => {
  const data = await contract(chain).tokensSold();
  const result = ethers.utils.formatUnits(data, 18);
  console.log(result);
  
  return result;
};

export const getHasPresaleEnded = async (chain: string) => {
  return await contract(chain).presaleEnded();
};

export const getHasPresaleStarted = async (chain: string) => {
  return await contract(chain).presaleStarted();
};

export const getEthPrice = async (chain: string) => {
  const transaction = await contract(chain).getETHPrice();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  console.log(result);
  return result;
};
