import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

const UnAuthNav = ({ logo }: any) => {
  const { t } = useTranslation("common");
  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-2">
            <div className="logo-area">
              <a href="/">
                <img
                  src={logo || ""}
                  className="img-fluid cp-user-logo-large"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="col-md-10">
            <div className="menu-area text-right">
              <nav className="main-menu mobile-menu">
                <ul id="nav">
                  <li>
                    <a href="/exchange/dashboard">{t("Trade")}</a>
                  </li>
                  <li>
                    <Link href="/authentication/signin">{t("Login")}</Link>
                  </li>
                  <li>
                    <Link href="/authentication/signup">{t("Sign up")}</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UnAuthNav;
