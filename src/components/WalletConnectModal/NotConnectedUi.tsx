import { useConnect } from "wagmi";
import metamaskIcon from "../../assets/metamask.svg";
import coinbaseIcon from "../../assets/coinbase.png";
import walletconnectIcon from "../../assets/walletconnect.png";
import Spinner from "../Spinner";

type iconType = keyof typeof connectorIcon;

const connectorIcon = {
  metaMask: metamaskIcon,
  coinbaseWallet: coinbaseIcon,
  walletConnect: walletconnectIcon,
};

const NotConnectedUi = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  
  return (
    <>
      <div className="text-neutral_500 text-center mt-10">
        Connect to any supported wallet to securely store your cryptocurrencies
      </div>
      <div className=" mt-12 mb-10">
        {connectors.map((connector, index) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
            className={`${
              index === 0 ? "mt-0" : "mt-14"
            } w-full flex items-center justify-between`}
          >
            <div className="text-base_black font-medium text-[17px] flex items-center gap-4">
              <img
                src={connectorIcon[connector.id as iconType]}
                alt=""
                width={32}
              />
              <span>{connector.name}</span>
            </div>
            {isLoading && connector.id === pendingConnector?.id && <Spinner />}
            {connector.id === "metaMask" && (
              <div className="leading-none py-1 px-2.5 rounded-3xl text-[11.5px] bg-[#F26395] text-white">
                popular
              </div>
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default NotConnectedUi;
