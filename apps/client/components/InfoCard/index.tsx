import { ConnectButton } from "@rainbow-me/rainbowkit";
import sty from "./style.module.scss";
import Logo from "../../assets/logo.png";
import Image from "next/image";

const InfoCard = () => {
  return (
    <>
      <div className={sty.InfoCard}>
        <div className={sty.websiteInfo}>
          <div className={sty.logoPart}>
            <Image src={Logo} width={80} height={80} />
          </div>
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
