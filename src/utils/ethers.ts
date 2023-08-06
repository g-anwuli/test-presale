import * as React from "react";
import { ethers, providers } from "ethers";
import { type WalletClient, useWalletClient, PublicClient, usePublicClient } from "wagmi";
import toast from "react-hot-toast";
import { HttpTransport } from "viem";

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === "fallback")
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network)
      )
    );
  return new providers.JsonRpcProvider(transport.url, network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return React.useMemo(
    () => publicClientToProvider(publicClient),
    [publicClient]
  );
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}

export const truncAddress = (length: number, val?: string): string => {
  if (!val) {
    return "";
  }
  return `${val.slice(0, 5)}...${val.slice(-length)}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleContractError = (error: any) => {
  console.log(error.code, error.error,error);
  if (error.code === ethers.utils.Logger.errors.ACTION_REJECTED) {
    toast.error(error?.error?.message || "user rejected action");
  } else if (error.code === ethers.utils.Logger.errors.INVALID_ARGUMENT) {
    toast.error(error?.error?.message || "Invalid Argument");
  } else if (
    error.code === ethers.utils.Logger.errors.UNPREDICTABLE_GAS_LIMIT
  ) {
    toast.error(error?.error?.message|| "unpredictable gas fee");
  } else {
    toast.error(error?.error?.message|| "unknown error occured");
  }
};
