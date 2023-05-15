import sty from "./style.module.scss";

interface BigButtonProps {
  label: string;
  onClick: () => void;
}

const BigButton = ({ label, onClick }: BigButtonProps) => {
  return (
    <button onClick={onClick} className={sty.BigButton}>
      {label}
    </button>
  );
};

export default BigButton;
