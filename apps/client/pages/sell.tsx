import type { NextPage } from "next";
import { PageConfig, ContentConfig } from "../constants/type";
import sty from "../styles/Sell.module.scss";

/** components */
import PageLayout from "../components/PageLayout";
import ContentLayout from "../components/ContentLayout";
import LabelInput from "../components/Input/LabelInput";
import DisplayList from "../components/DataDisplay/DisplayList";
import BigButton from "../components/Button/BigButton";

const pageConfig: PageConfig = {
  title: "Token Sell",
  description: "Generated by @rainbow-me/create-rainbowkit",
};

const contentConfig: ContentConfig = {
  title: "Sell",
  back: "",
};

const Sell: NextPage = () => {
  return (
    <PageLayout pageConfig={pageConfig}>
      <ContentLayout contentConfig={contentConfig}>
        <div className={sty.Sell}>
          <div className={sty.row}>
            <LabelInput
              label="Token"
              type="text"
              placeholder="Contract Address"
              value=""
              onChange={() => console.log("LabelInput")}
            />
            <DisplayList
              data={[
                { label: " label1", value: "value" },
                { label: " label2", value: "value" },
                { label: " label3", value: "value" },
              ]}
            />
          </div>
          <div className={sty.row}>
            <BigButton label="Submit" onClick={() => console.log("BigButton")} />
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default Sell;
