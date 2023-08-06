import { useAccount } from "wagmi";
import NotConnectedUi from "./NotConnectedUi";
import ConnectedUi from "./ConnectedUi";
import { Dialog, Transition } from "@headlessui/react";
import LeftArrowIcon from "../../assets/LeftArrowIcon";
import { Fragment } from "react";

type PropType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WalletConnectModal = ({ isOpen, setIsOpen }: PropType) => {
  const { isConnected } = useAccount();

  const close = () => setIsOpen(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[11]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 lg:ml-auto bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-[5%] py-12">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-max h-max max-w-full transform overflow-hidden rounded-[20px] bg-white shadow-xl transition-all font-inter pb-6 pt-7 px-[20px] xs:px-6 ">
                <Dialog.Title
                  as="h3"
                  className="text-[20px] sm:text-[24px] font-semibold sm:font-medium leading-[24px] sm:leading-[28px] text-base_black flex items-center relative"
                >
                  <span
                    onClick={close}
                    className="xs:absolute top-0 left-0 h-full flex items-center -ml-1"
                  >
                    <LeftArrowIcon />
                  </span>
                  <span className="text-center w-full">
                    {isConnected ? "Your Wallet" : "Connect Wallet"}
                  </span>
                </Dialog.Title>
                <div
                  className={`w-[440px] max-w-full transition-all h-[350px]`}
                >
                  {isConnected ? <ConnectedUi /> : <NotConnectedUi />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WalletConnectModal;
