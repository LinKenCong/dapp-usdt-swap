import { CloseCircleOutlined } from "@ant-design/icons";
import { formatInputFloat } from "../../utils";
import sty from "./style.module.scss";
import { useState } from "react";

interface LabelInputButtonProps {
  label: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  btnText?: string;
  value?: string;
  onClick: (value: string) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelInputButton(props: LabelInputButtonProps) {
  const [showInput, setShowInput] = useState(false);
  const [editValue, setEditValue] = useState<string>("");

  const handleClick = async () => {
    await props.onClick(editValue);
    setShowInput(false);
  };
  const handleChange = (e: any) => {
    setEditValue(String(e.target.value));
  };

  return (
    <div className={sty.LabelInputButton}>
      <label className={sty.label}>{props.label}</label>
      <div className={sty.inputWrapper}>
        {!!showInput ? (
          <>
            <input
              type={props.type}
              placeholder={props.placeholder}
              value={editValue}
              onChange={handleChange}
              onInput={props.onInput}
              className={sty.input}
            />
            <button onClick={handleClick} className={sty.button}>
              {props.btnText || "Set"}
            </button>
            <button onClick={() => setShowInput(false)} className={`${sty.button} ${sty.close}`}>
              <CloseCircleOutlined />
            </button>
          </>
        ) : (
          <>
            <span className={sty.value}>{props.value}</span>
            <button
              onClick={() => {
                setEditValue(String(props.value));
                setShowInput(true);
              }}
              className={`${sty.button} ${sty.edit}`}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LabelInputButton;
