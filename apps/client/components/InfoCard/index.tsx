import { ConnectButton } from "@rainbow-me/rainbowkit";
import sty from "./style.module.scss";

const InfoCard = () => {
  return (
    <>
      <div className={sty.InfoCard}>
        <div className={sty.websiteInfo}>
          <div className={sty.logoPart}></div>
          <div className={sty.titlePart}></div>
        </div>
        <div className={sty.userInfo}>
          <ConnectButton accountStatus="address" chainStatus="icon" showBalance={false} />
        </div>
      </div>
    </>
  );
};
export default InfoCard;
