import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import DropDownIcon from "../../assets/DropDownIcon";

type SelectProp = {
  data: string[] | number[];
  label?: string;
  labelClassName?: string;
  className?: string;
  selected: string | number;
  setSelected: Dispatch<SetStateAction<string | number>>;
  children?: React.ReactNode;
  onChange?: (value: string | number) => Promise<void> | void;
};

const CustomSelect = ({
  data,
  label,
  labelClassName,
  className,
  children,
  selected,
  setSelected,
  onChange,
}: SelectProp) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {label && (
        <div
          className={`${
            labelClassName ? labelClassName : ""
          } text-left font-medium mb-1.5 ml-1 flex`}
        >
          {label} {children && children}
        </div>
      )}
      <div className={`relative w-full ${className}`}>
        <Listbox.Button className="relative min-w-max w-full h-[56px] bg-transparent border border-primary border-1 text-black_default rounded-full text-left px-5 flex gap-1.5 justify-between items-center sm:text-[18px]">
          {({ open }) => (
            <>
              {selected}{" "}
              <DropDownIcon
                className={`text-primary transition ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-[1] right-0 mt-2 max-h-[300px] max-w-full w-[250px] overflow-auto bg-white shadow-md focus:outline-none rounded-lg">
            {data.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active, selected }) =>
                  `relative cursor-default select-none px-4 py-3 text-black_default text-left transition-colors  ${
                    active ? "bg-primary text-white dark:text-white" : ""
                  } ${
                    selected
                      ? "bg-primary text-white dark:text-white"
                      : "bg-tranparent"
                  } ${!active && !selected && "dark:text-zinc-900"}`
                }
                value={person}
                onClick={() => (onChange ? onChange(person) : null)}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate text-[16px] ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {person}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default CustomSelect;
