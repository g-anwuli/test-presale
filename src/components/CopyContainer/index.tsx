import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";
import CopyIcon from "../../assets/CopyIcon";

type Prop = {
  text: string;
  width?: number;
};
const CopyContainer = ({ text, width = 22 }: Prop) => {
  const [show, setShow] = useState(false);

  const handleTransitionEnd = () => {
    setShow(false);
  };

  const handleCopy = () => {
    console.log("copied");

    setShow(true);
  };

  return (
    <span className="w-max relative">
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <CopyIcon
          width={width}
          className="active:scale-95 transition-transform"
        />
      </CopyToClipboard>
      <span
        className={`absolute top-1 right-[110%] box-shadow bg-black/80 text-white text-xs px-2 py-1 rounded transition-opacity ${
          show ? "opacity-100 " : "delay-[1500ms] opacity-0"
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        copied
      </span>
    </span>
  );
};

export default CopyContainer;
