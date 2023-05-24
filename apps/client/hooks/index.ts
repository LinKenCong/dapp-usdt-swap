import { useEffect, useState } from "react";
import { utils, ethers, BigNumber } from "ethers";

export const useEthersSigner = (address: string | undefined, signer: ethers.Signer | undefined | null) => {
  const [ethersSigner, setEthersSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);

  useEffect(() => {
    if (!address || !signer) {
      setEthersSigner(null);
    } else {
      const unspecifiedData: any = signer;
      const provider = new ethers.providers.Web3Provider(unspecifiedData?.provider?.provider);
      setEthersSigner(provider.getSigner(address));
    }
  }, [address, signer]);

  return ethersSigner;
};
