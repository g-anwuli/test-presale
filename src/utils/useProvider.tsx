import { ethers } from "ethers";
import { useState, useEffect } from "react";

export const useEthersProvider = () => {
  const [provider, setProvider] =
    useState<ethers.providers.JsonRpcProvider | null>(null);

  useEffect(() => {
    // Create the provider
    const newProvider = new ethers.providers.JsonRpcProvider(
      "https://sepolia.infura.io/v3/063a60c10ac741779bd263e121f5148f"
    );

    // Check if the provider is valid
    newProvider
      .getNetwork()
      .then(() => {
        setProvider(newProvider);
      })
      .catch((error) => {
        console.error("Provider is not valid:", error);
        setProvider(null);
      });
  }, []);

  return provider;
};
