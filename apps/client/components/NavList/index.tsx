import commonSty from "../../styles/common.module.scss";
import sty from "./style.module.scss";

const NavListConfig = [
  {
    text: "Buy",
  },
  {
    text: "Sell",
  },
  {
    text: "Token List",
  },
];

const NavList = () => {
  return (
    <>
      <div className={sty.NavList}>
        <ul className={sty.list}>
          {NavListConfig.map((item: any, index: number) => (
            <li className={sty.item} key={index}>
              <button className={`${commonSty.button} ${commonSty.button_default} ${sty.btn}`}>{item.text}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default NavList;
