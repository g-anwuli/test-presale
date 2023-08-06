import { useAccount, useDisconnect } from "wagmi";
import { truncAddress } from "../../utils/ethers";

const ConnectedUi = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div className=" font-semibold text-[18px] sm:text-[20px] text-neutral_900 mb-4 mt-8 sm:mt-9">
        Wallet Address
      </div>
      <div className="bg-[#3E3D55] w-full flex items-center justify-between py-3 sm:py-5 px-4 rounded-xl">
        <span className="font-medium text-white text-[12px] sm:text-[16px]">
          <span className="hidden xs:inline-block">
            {truncAddress(26, address)}
          </span>
          <span className="inline-block xs:hidden">
            {truncAddress(12, address)}
          </span>
        </span>
      </div>

      <div className="absolute bottom-4 left-0 w-full">
        <button
          className="block outline-none text-sm text-primary bg-primary/[0.15] mx-auto px-2.5 py-0.5 rounded"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default ConnectedUi;
