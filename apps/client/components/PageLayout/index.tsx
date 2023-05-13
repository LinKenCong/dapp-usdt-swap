import Head from "next/head";
import React, { ReactNode } from "react";
import sty from "./style.module.scss";
import commonSty from "../../styles/common.module.scss";

/** components */
import Footer from "../Footer";
import InfoCard from "../InfoCard";
import NavList from "../NavList";

interface Props {
  children: ReactNode;
  pageConfig: {
    title: string;
    description: string;
  };
}

const PageLayout = ({ children, pageConfig }: Props) => {
  return (
    <div className={sty.container}>
      <Head>
        <title>{pageConfig.title}</title>
        <meta content={pageConfig.description} name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={sty.main}>
        <div className={sty.grid}>
          <div className={sty.outerLayer}>
            {/* Sider */}
            <div className={sty.sider}>
              <InfoCard />
              <NavList />
            </div>
            {/* Content */}
            <div className={`${commonSty.page} ${sty.content}`}>{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default PageLayout;
