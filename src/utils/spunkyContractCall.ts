import { ethers } from "ethers";
import SPUNKYABI from "../ABI/SSDX.json";
import BEP20USDT from "../ABI/BEP20USDT.json";
import SEPOLIAUSDT from "../ABI/SEPOLIAUSDT.json";
import ETHUSDT from "../ABI/ETHUSDT.json";
import ARBUSDT from "../ABI/ARBUSDT.json";

const usdtMap = {
  1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  56: "0x55d398326f99059fF775485246999027B3197955",
  11155111: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
  42161: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
} as Record<number, string>;

const abiMap = {
  1: ETHUSDT,
  56: BEP20USDT,
  11155111: SEPOLIAUSDT,
  42161: ARBUSDT,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<number, any>;

const contract = (signer?: ethers.providers.JsonRpcSigner) =>
  new ethers.Contract(
    "0xE368a55e9F9D14aD7746bb0193FA0efB6f47eD29",
    SPUNKYABI,
    signer
  );

const usdtContract = (chain: number, signer?: ethers.providers.JsonRpcSigner) =>
  new ethers.Contract(usdtMap[chain], abiMap[chain], signer);

export const approve =
  (signer?: ethers.providers.JsonRpcSigner) =>
  async (tokenAmount: number, chain: number) => {
    const amountInWei = ethers.utils.parseUnits(tokenAmount.toString(), 18);
    const tx = await usdtContract(chain, signer).approve(
      usdtMap[chain],
      amountInWei
    );
    return await tx.wait();
  };

export const buyToken =
  (signer?: ethers.providers.JsonRpcSigner) => async (amount: number) => {
    // Convert the provided USDT amount to Wei (or smallest unit of your token)
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);

    // const gasLimit = await contract(signer).estimateGas.buyTokens(amountInWei);

    const tx = await contract(signer).buyTokens(amountInWei);

    return await tx.wait();
  };

export const getPresaleAllocation = async (
  signer?: ethers.providers.JsonRpcSigner
) => {
  if (!signer) return;
  const transaction = await contract(signer).getPresaleAllocation();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  return result;
};

export const getTotalSupply = async (
  signer?: ethers.providers.JsonRpcSigner
) => {
  if (!signer) return;
  const transaction = await contract(signer).getTotalSupply();
  const data = await transaction;
  const result = ethers.utils.formatUnits(data, 18);
  return result;
};

export const getPresaleState = async (
  signer?: ethers.providers.JsonRpcSigner
) => {
  if (!signer) return;
  const transaction = await contract(signer).getPresaleState();
  return transaction;
};
