import classNames from "classnames";
import React from "react";

interface Props {
  value: string;
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  value,
  placeholder,
  id,
  name,
  className,
  onChange,
}: Props) => (
  <input
    id={id}
    name={name}
    value={value}
    type="text"
    className={classNames(
      "border-0 border-b border-b-main bg-transparent text-sm font-light text-white outline-none md:text-xl",
      className
    )}
    placeholder={placeholder}
    onChange={onChange}
  />
);

export default TextInput;
