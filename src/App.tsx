import React, { useState } from "react";
import Logo from "./assets/LogoIcon";
import WalletConnectModal from "./components/WalletConnectModal";
import Button from "./components/button";
import { useAccount, useConnect, useNetwork, useQuery } from "wagmi";
import {
  handleContractError,
  truncAddress,
  useEthersSigner,
} from "./utils/ethers";
import {
  approve,
  getPresaleAllocation,
  getPresaleState,
  getTotalSupply,
} from "./utils/spunkyContractCall";
import CustomSelect from "./components/CustomSelect";
import { switchNetwork } from "wagmi/actions";
import ToggleMode from "./components/ToogleMode";
import ProgressIcon from "./assets/ProgressIcon";
import { Toaster } from "react-hot-toast";

const chaindata = [
  "BSC Chain (BSC)",
  "Ethereum (ETH)",
  "Arbitrum (ARB)",
  "Sepolia",
];

const chains = {
  "BSC Chain (BSC)": 56,
  "Arbitrum (ARB)": 42161,
  "Ethereum (ETH)": 1,
  Sepolia: 11155111,
};

const chainsReverse = {
  1: "Ethereum (ETH)",
  56: "BSC Chain (BSC)",
  42161: "Arbitrum (ARB)",
  11155111: "Sepolia",
} as Record<number, string>;

type CHAINSLABEL = keyof typeof chains;

const PRICE = 0.00001;

const App = () => {
  const { isLoading } = useConnect();
  const { isConnected, address } = useAccount();
  const signer = useEthersSigner();
  const { chain } = useNetwork();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, SetAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | number>(
    chainsReverse[chain?.id || 1]
  );
  const cachwMode = JSON.parse(
    localStorage.getItem("mode") || JSON.stringify(false)
  );

  const [mode, setMode] = useState(cachwMode as boolean);

  const switchingNetwork = async (value: string | number) => {
    if (chain?.id !== chains[value as CHAINSLABEL]) {
      await switchNetwork({
        chainId: chains[value as CHAINSLABEL],
      });
    }
  };

  const bal = async () => {
    try {
      const res1 = await getPresaleAllocation(signer);
      const res3 = await getPresaleState(signer);
      const res4 = await getTotalSupply(signer);
      const total = parseInt(res4 || "0") * 0.2;
      const balance = parseInt(res1 || "0");
      return {
        total: total,
        balance: balance,
        isPresale: res3,
        per: Math.round((total - balance) / total) * 100 || 0,
      };
    } catch (error) {
      // handleContractError(error);
    }
  };

  const _buyTokenAsync = async () => {
    try {
      setLoading(true);
      const re = await approve(signer)(
        parseInt(amount),
        chains[selected as CHAINSLABEL]
      );
      // const re2 = await buyToken(signer)(parseInt(amount));
      console.log(re);
      // return { re1: re, re2: re2 };
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleContractError(error);
    }
  };

  const { data } = useQuery(["presale-data", signer?._address], {
    queryFn: bal,
    refetchInterval: 1800000,
  });

  // console.log(data);

  const _reqAcc = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    SetAmount(e.target.value);
  };

  return (
    <div
      className={`w-screen min-h-screen h-max pb-24 font-inter transition-colors ${
        mode ? "dark bg-[#32236F]" : "bg-[#F6F4FE]"
      }`}
    >
      <Toaster />
      <div className="w-screen px-[4%] py-5 md:py-[24px] flex justify-between items-center">
        <div className="scale-[0.77] lg:scale-100">
          <Logo />
        </div>
        <Button onClick={_reqAcc} loading={isLoading} h="h-[48px] md:h-[52px]">
          {isConnected ? truncAddress(6, address) : "Connect Wallet"}
        </Button>
      </div>
      <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center w-full px-[4%] py-[50px] lg:py-[100px]  text-zinc-900 dark:text-white">
        <div>
          <div className="text-zinc-800 dark:text-white text-[40px] sm:text-[50px] xl:text-[70px] font-bold leading-[1.4]">
            SpunkySDX is a Revolutionary asset tracking platform
          </div>
          <div className="text-neutral-700 dark:text-white text-[18px] xs:text-[20px]  sm:text-[24px] font-normal leading-[35px] tracking-tight my-10">
            SpunkySDX leverages advanced AI technology to actively track and
            monitor stolen asset on the EVM chain.
          </div>
          <Button>
            <a href="https://dapp.spunkysdx.com">Get Started</a>
          </Button>
        </div>
        <div className="relative my-[20px] lg:my-0 mx-auto lg:ml-auto max-w-[623px] w-full">
          <div className="h-full w-full rounded-3xl xs:rounded-[40px] box-gradient relative z-[1] py-6 sm:py-8 px-[5%]">
            <div className="justify-center items-center xs:gap-2 xl:gap-[25px] flex font-bold text-[20px] xs:text-[23px] sm:text-[28px]">
              <div className="">PRE-SALE</div>
              <div className="scale-[0.50] xs:scale-[0.70] xl:scale-[0.77] hidden xs:inline-block">
                <Logo />
              </div>
              <div className="ml-3 xs:ml-0">
                <span className="text-fuchsia-600 ">SPUNKY</span>
                <span className="">SDX</span>
              </div>
            </div>
            <div className="text-zinc-700 dark:text-white text-[16px] xs:text-[18px] sm:text-[20px] font-medium text-center mt-3">
              Progress: {data?.per}%
            </div>
            <div className="h-[30px] xs:h-[37px] w-full rounded-[50px] bg-[#D9D9D9] mt-6 overflow-hidden">
              <div
                className="relative h-full rounded-[50px] bg-primary"
                style={{
                  width: `${data?.per || 5}%`,
                }}
              >
                <ProgressIcon className="absolute top-1/2 -translate-y-1/2 -right-5" />
              </div>
            </div>
            <div className="my-12 xs:my-16 flex justify-between text-[18px] xs:text-[20px] sm:text-[24px] font-bold">
              <div>
                <div className="font-normal mb-2 text-[15px] xs:text-[16px] sm:text-[17px]">
                  Total Raised
                </div>
                <div>$1,780,039</div>
              </div>
              <div>
                <div className="font-normal mb-2 text-[15px] xs:text-[16px] sm:text-[17px]">
                  Sold
                </div>
                <div>$1,780,039</div>
              </div>
            </div>
            <div>
              <div className="font-normal mb-2 text-[16px] sm:text-[17px]">
                Amount of SSDX
              </div>
              <div>{Math.round(parseFloat(amount) / PRICE) || 0}</div>
            </div>
            <CustomSelect
              data={chaindata}
              selected={selected}
              setSelected={setSelected}
              onChange={switchingNetwork}
              className="mt-10 xs:mt-[57px] mb-7"
            />
            {[1, 56, 11155111, 42161].includes(chain?.id || 0) ? (
              <>
                <input
                  type="number"
                  placeholder="Enter USDT Amounnt"
                  value={amount}
                  onChange={handleChange}
                  className="bg-transparent rounded-[50px] w-full border border-[#C0CCDD] h-14 xs:h-16 mb-10 xs:mb-[63px] text-center text-lg sm:text-xl focus:outline-primary"
                />
                <Button
                  w="w-full"
                  className="mb-2 xs:mb-5"
                  loading={loading}
                  disabled={!data?.isPresale || !amount}
                  onClick={_buyTokenAsync}
                >
                  BUY SSDX
                </Button>
              </>
            ) : (
              <div className="text-center text-[17px] xs:text-[18px] sm:text-[20px] text-primary mb-5">
                Current Network not supported!
              </div>
            )}
          </div>
          <div className="purple-ball absolute -top-[80px] -left-[30px] hidden lg:inline-block" />
          <div className="purple-ball absolute -bottom-[80px] right-0 hidden lg:inline-block" />
        </div>
      </div>
      <ToggleMode mode={mode} setMode={setMode} />
      <WalletConnectModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default App;
