import sty from "./style.module.scss";

interface DisplayListProps {
  data: { label: string; value: string }[];
}

function DisplayList({ data }: DisplayListProps) {
  return (
    <ul className={sty.DisplayList}>
      {data.map((item, index) => (
        <li key={index} className={sty.item}>
          <span className={sty.label}>{item.label}</span>
          <span className={sty.value}>{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

export default DisplayList;