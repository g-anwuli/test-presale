import { useEffect, useState } from "react";
import Logo from "./assets/LogoIcon";
import {
  contract,
  getEthPrice,
  getPresaleAllocation,
  getPresaleState,
  getTotalSupply,
} from "./utils/spunkyContractCall";
import ToggleMode from "./components/ToogleMode";
import ProgressIcon from "./assets/ProgressIcon";
import { Toaster } from "react-hot-toast";
import Button from "./components/button";
import CopyContainer from "./components/CopyContainer";
import { ethers } from "ethers";

const App = () => {
  const cachwMode = JSON.parse(
    localStorage.getItem("mode") || JSON.stringify(false)
  );
  const [mode, setMode] = useState(cachwMode as boolean);
  const [data, setData] = useState({
    isPresale: true,
    balance: 0,
    eth: 0,
    total: 0,
  });

  useEffect(() => {
    const bal = async () => {
      const res1 = await getPresaleAllocation();
      const res2 = await getPresaleState();
      const res3 = await getTotalSupply();
      const res4 = await getEthPrice();
      const total = parseInt(res3 || "0") * 0.2;
      const balance = parseInt(res1 || "0");
      const eth = parseFloat(res4 || "0");

      const data = {
        isPresale: res2,
        balance,
        eth,
        total,
      };

      setData(data);
    };

    const ar = async () => {
      try {
        await bal();
      } catch (error) {
        console.log(error);
      }
    };

    ar();
    contract.on("BuyTokens", async (tokensToBuy: ethers.BigNumber) => {
      // This will be called whenever the BuyTokens event is emitted
      const updatedAllocation = Number(
        ethers.utils.formatUnits(tokensToBuy, 18)
      );
      console.log("Tokens bought:", updatedAllocation);
      setData((data) => ({ ...data, balance: updatedAllocation }));
      await bal();
    });
  }, []);

  const per = Math.round(
    ((data.total - data.balance) / (data.total || 1)) * 100
  );
  const usdtRaised = Math.round(data.eth * (data.total - data.balance));

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
      </div>
      <div className="lg:grid lg:grid-cols-2 gap-14 xl:gap-20 items-center w-full px-[4%] py-[50px] lg:py-[100px]  text-zinc-900 dark:text-white">
        <div>
          <div className="text-zinc-800 dark:text-white text-[36px] xs:text-[40px] sm:text-[50px] xl:text-[70px] font-bold leading-[1.4]">
            SpunkySDX is a Revolutionary asset tracking platform
          </div>
          <div className="text-neutral-700 dark:text-white text-[16px] xs:text-[20px]  sm:text-[24px] font-normal leading-[35px] tracking-tight my-10">
            SpunkySDX leverages advanced AI technology to actively track and
            monitor stolen asset on the EVM chain.
          </div>
          <Button>
            <a href="https://dapp.spunkysdx.com">Get Started</a>
          </Button>
        </div>
        <div className="relative my-10 lg:my-0 mx-auto lg:ml-auto max-w-[530px] w-full">
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
              Progress: {per}%
            </div>
            <div
              className={`h-[30px] xs:h-[37px] w-full rounded-[50px] bg-[#D9D9D9] mt-6 ${
                per < 90 ? "overflow-hidden" : ""
              }`}
            >
              <div
                className="relative h-full rounded-[50px] bg-primary transition-all ease-in-out duration-300"
                style={{
                  width: per > 100 ? "100%" : `${per}%`,
                }}
              >
                <ProgressIcon className="transition-all rocket" />
              </div>
            </div>
            <div className="my-12 xs:my-16 flex justify-between text-[18px] xs:text-[20px] sm:text-[24px] font-bold">
              <div>
                <div className="font-normal mb-2 text-[15px] xs:text-[16px] sm:text-[17px]">
                  Total Raised
                </div>
                <div>${usdtRaised}</div>
              </div>
            </div>
            {data.isPresale && (
              <div className="text-[20px] sm:text-[22px] font-medium mb-2 flex items-center gap-4">
                Contract Address{" "}
                <div className=" scale-105 sm:scale-110">
                  <CopyContainer text="0xFE68Dc4F68112cB08983ec6E041bBf6370F3F39b" />
                </div>
              </div>
            )}
            <div
              className={`text-center text-[17px] xs:text-[18px] sm:text-[20px] text-primary mb-5 truncate  p-4 rounded-lg ${
                mode ? "bg-bg_purple/40" : "bg-bg_purple/10"
              }`}
            >
              {data.isPresale
                ? "0xFE68Dc4F68112cB08983ec6E041bBf6370F3F39b"
                : "Presale has ENDED"}
            </div>
          </div>
          <div className="purple-ball absolute -top-[80px] -left-[30px] hidden lg:inline-block" />
          <div className="purple-ball absolute -bottom-[80px] right-0 hidden lg:inline-block" />
        </div>
      </div>
      <ToggleMode mode={mode} setMode={setMode} />
    </div>
  );
};

export default App;
