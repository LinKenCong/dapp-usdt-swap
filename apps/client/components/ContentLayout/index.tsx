import sty from "./style.module.scss";
import commonSty from "../../styles/common.module.scss";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  contentConfig: {
    title: string;
    back: string;
  };
}

const ContentLayout = ({ children, contentConfig }: Props) => {
  return (
    <>
      <section className={sty.ContentLayout}>
        <div className={sty.header}>
          {contentConfig.back && (
            <button className={`${commonSty.button} ${commonSty.button_back} ${sty.btn}`}>Back</button>
          )}
          <h1 className={sty.title}>{contentConfig.title}</h1>
        </div>
        <div className={sty.content}>
          <article className={sty.children}>{children}</article>
        </div>
      </section>
    </>
  );
};
export default ContentLayout;
