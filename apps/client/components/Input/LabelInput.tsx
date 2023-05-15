import sty from "./style.module.scss";

interface LabelInputProps {
  label: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput = ({ label, type = "text", placeholder, value, onChange }: LabelInputProps) => {
  return (
    <>
      <div className={sty.LabelInput}>
        <label className={sty.label}>{label}</label>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={sty.input} />
      </div>
    </>
  );
};
export default LabelInput;
