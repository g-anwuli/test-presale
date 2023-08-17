import moon from "../../assets/moon.svg";
import sun from "../../assets/sun.svg";

type Prop = {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  mode: boolean;
};
const ToggleMode = ({ mode, setMode }: Prop) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("mode", JSON.stringify(!mode));
    setMode(e.target.checked);
  };
  return (
    <label
      className={`${mode ? "bg-[#3E3D55]" : "bg-primary"}
    fixed bottom-[5vh] right-[5vw] z-[2] flex justify-center items-center h-[50px] w-[50px]  md:cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none box-shadow text-white`}
    >
      <input
        type="checkbox"
        checked={mode}
        onChange={onChange}
        className="hidden invisible"
      />
      <img src={mode ? sun : moon} alt="" />
    </label>
  );
};

export default ToggleMode;
