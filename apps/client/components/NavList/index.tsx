import { useRouter } from "next/router";
import { NavListItem } from "../../constants/type";
import { NavListConfig } from "../../constants/config";
import commonSty from "../../styles/common.module.scss";
import sty from "./style.module.scss";

const NavList = () => {
  const router = useRouter();

  const navClick = (page: string) => {
    router.push(`${page}`);
  };

  return (
    <>
      <div className={sty.NavList}>
        <ul className={sty.list}>
          {NavListConfig.map((item: NavListItem, index: number) => (
            <li className={sty.item} key={index}>
              <button
                className={`${commonSty.button} ${commonSty.button_default} ${sty.btn}`}
                onClick={() => navClick(item.page)}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default NavList;
