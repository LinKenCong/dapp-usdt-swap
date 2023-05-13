import sty from "./style.module.scss";

const NavList = () => {
  return (
    <>
      <div className={sty.NavList}>
        <ul className={sty.list}>
          <li className={sty.item}>Swap</li>
        </ul>
      </div>
    </>
  );
};
export default NavList;
