import sty from "./style.module.scss";
import { useState } from "react";

interface LabelInputButtonProps {
  label: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
}

function LabelInputButton({ label, type = "text", placeholder, value, onChange, buttonText }: LabelInputButtonProps) {
  const [showInput, setShowInput] = useState(true);
  const [showValue, setShowValue] = useState(false);

  function handleClick() {
    setShowInput(false);
    setShowValue(true);
  }

  return (
    <div className={sty.LabelInputButton}>
      {showInput && (
        <>
          <label className={sty.label}>{label}</label>
          <div className={sty.inputWrapper}>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={sty.input} />
            <button onClick={handleClick} className={sty.button}>
              {buttonText}
            </button>
          </div>
        </>
      )}
      {showValue && (
        <div className={sty.valueWrapper}>
          <span className={sty.value}>{value}</span>
          <button
            onClick={() => {
              setShowInput(true);
              setShowValue(false);
            }}
            className={sty.button}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default LabelInputButton;
