import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { BsBarChartLine, BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiNetworkChart } from "react-icons/bi";
import { IoLanguageSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiArrowNarrowRight, HiOutlineDocumentReport } from "react-icons/hi";
import { BiWalletAlt } from "react-icons/bi";
import {
  RiCalendarEventLine,
  RiNotificationBadgeLine,
  RiWallet3Line,
} from "react-icons/ri";
import { RootState } from "state/store";
import { LogoutAction } from "state/actions/user";
import useTranslation from "next-translate/useTranslation";
import { notification, notificationSeen } from "service/notification";
import { LanguageList } from "helpers/lang";
import { useRouter } from "next/router";
import moment from "moment";
import { checkThemeState, darkModeToggleDashboard } from "helpers/functions";
const DashboardNavbar = () => {
  const { isLoggedIn, user, logo } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const [theme, setTheme] = useState(0);
  const { settings } = useSelector((state: RootState) => state.common);
  const { navbar } = settings;

  const [active, setActive] = useState(false);
  const [notificationData, setNotification] = useState<any>([]);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const getNotifications = async () => {
    const data = await notification();
    setNotification(data.data.data);
  };
  const seen = async () => {
    let arr: any = [];
    notificationData.map((notification: any) => {
      arr.push(notification.id);
    });
    notificationSeen(arr).then((data: any) => {
      setNotification([]);
    });
  };
  useEffect(() => {
    checkThemeState(setTheme);
    isLoggedIn && getNotifications();
  }, [isLoggedIn]);
  useEffect(() => {
    if (router.locale === "ar") {
      document.body.classList.add("rtl-style");
    } else {
      document.body.classList.remove("rtl-style");
    }
  }, [router.locale]);
  return (
    <>
      <div className="cp-user-top-bar dark-board">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-2 col-lg-2 col-4">
              <div className="cp-user-logo">
                <Link href="/">
                  <a href="">
                    <img
                      src={logo || ""}
                      className="img-fluid cp-user-logo-large"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              <nav className="main-menu">
                <ul>
                  {navbar?.trade?.status && (
                    <li
                      className={
                        router.pathname == "/exchange/dashboard"
                          ? "cp-user-active-page"
                          : ""
                      }
                    >
                      <a
                        href={
                          router.locale !== "en"
                            ? `/${router.locale}/exchange/dashboard`
                            : "/exchange/dashboard"
                        }
                      >
                        <span className="cp-user-icon">
                          <BsBarChartLine />
                        </span>
                        <span className="cp-user-name">
                          {navbar?.trade?.name
                            ? navbar?.trade?.name
                            : t("Trade")}
                        </span>
                      </a>
                    </li>
                  )}
                  {navbar?.wallet?.status && (
                    <Link
                      href={
                        isLoggedIn === true
                          ? "/user/my-wallet"
                          : "/authentication/signin"
                      }
                    >
                      <li
                        className={
                          router.pathname == "/user/my-wallet"
                            ? "cp-user-active-page"
                            : router.pathname == "/user/swap-coin"
                            ? "cp-user-active-page"
                            : ""
                        }
                      >
                        <a href="">
                          <span className="cp-user-icon">
                            <BiWalletAlt />
                          </span>
                          <span className="cp-user-name">
                            {navbar?.wallet?.name
                              ? navbar?.wallet?.name
                              : t("Wallet")}
                          </span>
                        </a>
                      </li>
                    </Link>
                  )}
                  {parseInt(settings.launchpad_settings) === 1 &&
                    navbar?.ico?.status && (
                      <Link
                        href={isLoggedIn ? "/ico" : "/authentication/signin"}
                      >
                        <li
                          className={
                            router.pathname == "/ico"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">
                            <span className="cp-user-icon">
                              <RiCalendarEventLine />
                            </span>
                            <span className="cp-user-name">
                              {navbar?.ico?.name ? navbar?.ico?.name : t("ICO")}
                            </span>
                          </a>
                        </li>
                      </Link>
                    )}

                  {parseInt(settings.currency_deposit_status) === 1 &&
                    navbar?.fiat?.status && (
                      <li
                        className={
                          router.pathname == "/fiat-deposit"
                            ? "cp-user-active-page"
                            : router.pathname == "/fiat-withdrawal"
                            ? "cp-user-active-page"
                            : ""
                        }
                      >
                        <Link
                          href={
                            isLoggedIn === true
                              ? "/fiat-deposit"
                              : "/authentication/signin"
                          }
                        >
                          <a
                            className="arrow-icon"
                            href="#"
                            aria-expanded="true"
                          >
                            <span className="cp-user-icon">
                              <FiSettings />
                            </span>
                            <span className="cp-user-name">
                              {navbar?.fiat?.name
                                ? navbar?.fiat?.name
                                : t("Fiat")}
                            </span>
                          </a>
                        </Link>
                        <ul className="">
                          {navbar?.fiat?.deposit?.status && (
                            <Link
                              href={
                                isLoggedIn
                                  ? "/fiat-deposit"
                                  : "/authentication/signin"
                              }
                            >
                              <li>
                                <a href="">
                                  {navbar?.fiat?.deposit.name
                                    ? navbar?.fiat?.deposit.name
                                    : t("Deposit")}
                                </a>
                              </li>
                            </Link>
                          )}
                          {navbar?.fiat?.withdrawal?.status && (
                            <Link
                              href={
                                isLoggedIn
                                  ? "/fiat-withdrawal"
                                  : "/authentication/signin"
                              }
                            >
                              <li
                                className={
                                  router.pathname == "/fiat-withdrawal"
                                    ? "cp-user-active-page"
                                    : ""
                                }
                              >
                                <a href="">
                                  {navbar?.fiat?.withdrawal.name
                                    ? navbar?.fiat?.withdrawal.name
                                    : t("Withdrawal")}
                                </a>
                              </li>
                            </Link>
                          )}
                        </ul>
                      </li>
                    )}
                  <li
                    className={
                      router.pathname == "/user/wallet-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/swap-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/buy-order-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/sell-order-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/transaction-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/currency-deposit-history"
                        ? "cp-user-active-page"
                        : ""
                    }
                  >
                    {navbar?.reports?.status && (
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/wallet-history?type=deposit"
                            : "/authentication/signin"
                        }
                      >
                        <a className="arrow-icon" href="#" aria-expanded="true">
                          <span className="cp-user-icon">
                            <HiOutlineDocumentReport />
                          </span>
                          <span className="cp-user-name">
                            {navbar?.reports?.name
                              ? navbar?.reports?.name
                              : t("Reports")}
                          </span>
                        </a>
                      </Link>
                    )}

                    <ul className="">
                      {navbar?.reports?.depositHistory?.status && (
                        <Link
                          href={
                            isLoggedIn
                              ? "/user/wallet-history?type=deposit"
                              : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname ==
                              "/user/wallet-history?type=deposit"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">
                              {navbar?.reports?.depositHistory?.name
                                ? navbar?.reports?.depositHistory?.name
                                : t("Deposit History")}
                            </a>
                          </li>
                        </Link>
                      )}
                      {navbar?.reports?.withdrawalHistory?.status && (
                        <Link
                          href={
                            isLoggedIn
                              ? "/user/wallet-history?type=withdrawal"
                              : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname ==
                              "/user/wallet-history?type=withdrawal"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">
                              {navbar?.reports?.withdrawalHistory?.name
                                ? navbar?.reports?.withdrawalHistory?.name
                                : t("Withdrawal History")}
                            </a>
                          </li>
                        </Link>
                      )}
                      {navbar?.reports?.swapHistory?.status && (
                        <Link
                          href={
                            isLoggedIn
                              ? "/user/swap-history"
                              : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname == "/user/swap-history"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">
                              {navbar?.reports?.swapHistory?.name
                                ? navbar?.reports?.swapHistory?.name
                                : t("Swap History")}
                            </a>
                          </li>
                        </Link>
                      )}
                      {navbar?.reports?.buyOrderHistory?.status && (
                        <Link
                          href={
                            isLoggedIn
                              ? "/user/buy-order-history"
                              : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname == "/user/buy-order-history"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">
                              {navbar?.reports?.buyOrderHistory?.name
                                ? navbar?.reports?.buyOrderHistory?.name
                                : t("Buy Order History")}
                            </a>
                          </li>
                        </Link>
                      )}
                      {navbar?.reports?.sellOrderHistory?.status && (
                        <Link
                          href={
                            isLoggedIn
                              ? "/user/sell-order-history"
                              : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname == "/user/sell-order-history"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">
                              {navbar?.reports?.sellOrderHistory?.name
                                ? navbar?.reports?.sellOrderHistory?.name
                                : t("Sell Order History")}
                            </a>
                          </li>
                        </Link>
                      )}
                      {navbar?.reports?.transactionHistory?.status && (
                        <Link
                          href={
                            isLoggedIn
                              ? "/user/transaction-history"
                              : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname == "/user/transaction-history"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">
                              {navbar?.reports?.transactionHistory?.name
                                ? navbar?.reports?.transactionHistory?.name
                                : t("Transaction History")}
                            </a>
                          </li>
                        </Link>
                      )}
                      {navbar?.reports?.fiatDepositHistory?.status &&
                        parseInt(settings.currency_deposit_status) === 1 && (
                          <Link
                            href={
                              isLoggedIn
                                ? "/user/currency-deposit-history"
                                : "/authentication/signin"
                            }
                          >
                            <li
                              className={
                                router.pathname ==
                                "/user/currency-deposit-history"
                                  ? "cp-user-active-page"
                                  : ""
                              }
                            >
                              <a href="">
                                {navbar?.reports?.fiatDepositHistory?.name
                                  ? navbar?.reports?.fiatDepositHistory?.name
                                  : t("Fiat Deposit History")}
                              </a>
                            </li>
                          </Link>
                        )}
                      {navbar?.reports?.fiatWithdrawalHistory?.status && (
                        <Link
                          href={
                            isLoggedIn
                              ? "/user/currency-withdraw-history"
                              : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname ==
                              "/user/currency-withdraw-history"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">
                              {navbar?.reports?.fiatWithdrawalHistory?.name
                                ? navbar?.reports?.fiatWithdrawalHistory?.name
                                : t("Fiat Withdrawal History")}
                            </a>
                          </li>
                        </Link>
                      )}
                    </ul>
                  </li>
                  {navbar?.myProfile?.status && (
                    <Link
                      href={
                        isLoggedIn ? "/user/profile" : "/authentication/signin"
                      }
                    >
                      <li
                        className={
                          router.pathname == "/user/profile"
                            ? "cp-user-active-page"
                            : ""
                        }
                      >
                        <a href="">
                          <span className="cp-user-icon">
                            <CgProfile />
                          </span>
                          <span className="cp-user-name">
                            {navbar?.myProfile?.name
                              ? navbar?.myProfile?.name
                              : t("My Profile")}
                          </span>
                        </a>
                      </li>
                    </Link>
                  )}
                  {navbar?.myReferral?.status && (
                    <Link
                      href={
                        isLoggedIn ? "/user/referral" : "/authentication/signin"
                      }
                    >
                      <li
                        className={
                          router.pathname == "/user/referral"
                            ? "cp-user-active-page"
                            : ""
                        }
                      >
                        <a href="">
                          <span className="cp-user-icon">
                            <BiNetworkChart />
                          </span>
                          <span className="cp-user-name">
                            {navbar?.myReferral?.name
                              ? navbar.myReferral?.name
                              : t("My Referral")}
                          </span>
                        </a>
                      </li>
                    </Link>
                  )}

                  <li
                    className={
                      router.pathname == "/user/settings"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/faq"
                        ? "cp-user-active-page"
                        : ""
                    }
                  >
                    {navbar?.settings?.ststus && (
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/settings"
                            : "/authentication/signin"
                        }
                      >
                        <a className="arrow-icon" href="#" aria-expanded="true">
                          <span className="cp-user-icon">
                            <FiSettings />
                          </span>
                          <span className="cp-user-name">
                            {navbar?.settings?.name
                              ? navbar?.settings?.name
                              : t("Settings")}
                          </span>
                        </a>
                      </Link>
                    )}
                    <ul className="">
                      {navbar?.settings?.mySettings?.status && (
                        <Link
                          href={
                            isLoggedIn
                              ? "/user/settings"
                              : "/authentication/signin"
                          }
                        >
                          <li>
                            <a href="">
                              {navbar?.settings?.mySettings?.name
                                ? navbar?.settings?.mySettings?.name
                                : t("My Settings")}
                            </a>
                          </li>
                        </Link>
                      )}
                      {navbar?.settings?.faq?.status && (
                        <Link
                          href={
                            isLoggedIn ? "/user/faq" : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname == "/user/faq"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">
                              {navbar?.settings?.faq?.name
                                ? navbar?.settings?.faq?.name
                                : t("FAQ")}
                            </a>
                          </li>
                        </Link>
                      )}
                    </ul>
                  </li>
                  <li>
                    <a className="arrow-icon" href="#" aria-expanded="true">
                      <span className="cp-user-icon">
                        <IoLanguageSharp />
                      </span>
                      <span className="cp-user-name">
                        {router.locale?.toLocaleUpperCase()}
                      </span>
                    </a>
                    <ul className="">
                      {settings?.LanguageList?.map((item: any, index: any) => (
                        <li key={index}>
                          <Link href={router.asPath} locale={item.key}>
                            <a className="py-1">{item.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-xl-2 col-lg-2 col-8">
              {isLoggedIn ? (
                <div className="cp-user-top-bar-right">
                  <div>
                    <ul>
                      <li className="hm-notify" id="notification_item">
                        <div className="btn-group dropdown">
                          <button
                            type="button"
                            className="btn notification-btn dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span
                              className="notify-value hm-notify-number"
                              onClick={() => {}}
                            >
                              {notificationData?.length > 100
                                ? "99+"
                                : notificationData?.length}
                            </span>
                            <img
                              src="/notification.png"
                              className="img-fluid"
                              alt=""
                            />
                          </button>
                          <div className="dropdown-menu notification-list dropdown-menu-right dark-trade-notify">
                            <div className="notify-menu">
                              <div className="notification-list-title">
                                <div className="notify-counter">
                                  <div className="notify-pending">
                                    <p>
                                      <span>{notificationData.length}</span>{" "}
                                      {t("pending notifications")}
                                    </p>
                                    <a
                                      onClick={() => {
                                        seen();
                                      }}
                                      className="clear-all"
                                      href="#"
                                    >
                                      {t("Clear All")}
                                    </a>
                                  </div>

                                  <div className="notifiy-clear">
                                    <Link href="/user/notification">
                                      <a
                                        // onClick={() => {
                                        //   seen();
                                        // }}
                                        className="view-all"
                                      >
                                        {t("View All")}
                                      </a>
                                    </Link>
                                    <HiArrowNarrowRight />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="notify-grid-item">
                                  {notificationData.length > 0 ? (
                                    notificationData
                                      ?.slice(0, 5)
                                      ?.map((item: any, index: number) => (
                                        <div
                                          className="notify-icon-title"
                                          key={index}
                                        >
                                          <RiNotificationBadgeLine
                                            size={20}
                                            className="notify-menu-icon"
                                          />
                                          <div>
                                            <h6>
                                              {item?.title.substring(0, 40)}
                                            </h6>
                                            <p>
                                              {item?.notification_body.substring(
                                                0,
                                                50
                                              )}
                                            </p>
                                            <span>
                                              {moment(item?.created_at).format(
                                                "DD MMM YYYY"
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      ))
                                  ) : (
                                    <p className="notFountNotifyText">
                                      {t("No Notification Found!")}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="hm-notify" id="notification_item">
                        <div className="btn-group profile-dropdown">
                          <button
                            type="button"
                            className="btn dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="cp-user-avater">
                              <span
                                className={`${
                                  user?.online_status?.online_status
                                    ? "tradeUserActive"
                                    : "tradeUserDeactive"
                                } cp-user-img`}
                              >
                                {user?.photo && (
                                  <img
                                    src={user?.photo}
                                    className="img-fluid"
                                    alt="user"
                                  />
                                )}
                              </span>
                              <span className="cp-user-avater-info"></span>
                            </span>
                          </button>
                          <div className="dropdown-menu dropdown-menu-right">
                            <span
                              className={`${
                                user?.online_status?.online_status
                                  ? "userActive"
                                  : "userDeactive"
                              } big-user-thumb`}
                            >
                              <img
                                src={user?.photo}
                                className="img-fluid"
                                alt=""
                              />
                            </span>
                            <div className="user-name">
                              <p className="nav-userName">
                                {user?.first_name!} {user?.last_name!}
                              </p>
                            </div>
                            <Link href="/user/profile">
                              <button className="dropdown-item" type="button">
                                <a href="">
                                  <i className="fa-regular fa-user"></i>{" "}
                                  {t("Profile")}
                                </a>
                              </button>
                            </Link>
                            <Link href="/user/settings">
                              <button className="dropdown-item" type="button">
                                <a href="">
                                  <i className="fa fa-cog"></i>{" "}
                                  {t("My Settings")}
                                </a>
                              </button>
                            </Link>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={async () => {
                                router.reload();
                                darkModeToggleDashboard();
                              }}
                            >
                              <a href="#">
                                {theme === 0 ? (
                                  <>
                                    <BsFillSunFill size={26} className="mr-2" />
                                    {t("Light")}
                                  </>
                                ) : (
                                  <>
                                    <BsFillMoonFill
                                      size={20}
                                      className="mr-2"
                                    />
                                    {t("Dark")}
                                  </>
                                )}
                              </a>
                            </button>
                            <Link href="/user/my-wallet">
                              <button className="dropdown-item" type="button">
                                <a href="-wallet">
                                  <i className="fa fa-credit-card"></i>{" "}
                                  {t("My Wallet")}
                                </a>
                              </button>
                            </Link>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => {
                                dispatch(LogoutAction());
                              }}
                            >
                              <a>
                                <i className="fa fa-sign-out"></i> {t("Logout")}
                              </a>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className={`cp-user-sidebar ${active ? "active" : ""}`}>
                    <div className="cp-user-sidebar-menu scrollbar-inner">
                      <nav>
                        <ul id="metismenu">
                          <li className=" cp-user-active-page ">
                            <a
                              href={
                                router.locale !== "en"
                                  ? `/${router.locale}/exchange/dashboard`
                                  : "/exchange/dashboard"
                              }
                            >
                              <span className="cp-user-icon">
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon"
                                  alt=""
                                />
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon-hover"
                                  alt=""
                                />
                              </span>
                              <span className="cp-user-name">
                                {t("Dashboard")}
                              </span>
                            </a>
                          </li>

                          <li>
                            <a
                              className="arrow-icon"
                              href="#"
                              aria-expanded="true"
                            >
                              <span className="cp-user-icon">
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon"
                                  alt=""
                                />
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon-hover"
                                  alt=""
                                />
                              </span>
                              <span className="cp-user-name">
                                {t("Wallet")}
                              </span>
                            </a>
                            <ul>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/my-wallet"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("My Wallet")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/swap-coin"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Swap Coin")}</a>
                                </li>
                              </Link>
                            </ul>
                          </li>
                          <li>
                            <a
                              className="arrow-icon"
                              href="#"
                              aria-expanded="true"
                            >
                              <span className="cp-user-icon">
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon"
                                  alt=""
                                />
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon-hover"
                                  alt=""
                                />
                              </span>
                              <span className="cp-user-name">
                                {t("Reports")}
                              </span>
                            </a>
                            <ul>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/wallet-history?type=deposit"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Deposit History")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/wallet-history?type=withdrawal"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Withdrawal History")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/swap-history"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Swap History")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/buy-order-history"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Buy Order History")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/sell-order-history"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Sell Order History")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/transaction-history"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Transaction History")}</a>
                                </li>
                              </Link>
                            </ul>
                          </li>
                          <li>
                            <a
                              className="arrow-icon"
                              href="#"
                              aria-expanded="true"
                            >
                              <span className="cp-user-icon">
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon"
                                  alt=""
                                />
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon-hover"
                                  alt=""
                                />
                              </span>
                              <span className="cp-user-name">
                                {t("My Profile")}
                              </span>
                            </a>
                            <ul>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/profile"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Profile")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/edit-profile"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Edit Profile")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/phone-verification"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Phone Verification")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/security"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Security")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/verification-list"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Verification List")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/personal-verification"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Personal Verification")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/change-password"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("Change Password")}</a>
                                </li>
                              </Link>
                            </ul>
                          </li>
                          <li>
                            <a href="">
                              <span className="cp-user-icon">
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon"
                                  alt=""
                                />
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon-hover"
                                  alt=""
                                />
                              </span>
                              <span className="cp-user-name">
                                {t("My Referral")}
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              className="arrow-icon"
                              href="#"
                              aria-expanded="true"
                            >
                              <span className="cp-user-icon">
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon"
                                  alt=""
                                />
                                <img
                                  src=""
                                  className="img-fluid cp-user-side-bar-icon-hover"
                                  alt=""
                                />
                              </span>
                              <span className="cp-user-name">
                                {t("Settings")}
                              </span>
                            </a>
                            <ul>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/settings"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("My Settings")}</a>
                                </li>
                              </Link>
                              <Link
                                href={
                                  isLoggedIn
                                    ? "/user/faq"
                                    : "/authentication/signin"
                                }
                              >
                                <li>
                                  <a href="">{t("FAQ")}</a>
                                </li>
                              </Link>
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`cp-user-sidebar ${active ? "active" : ""}`}>
        <div className="cp-user-sidebar-menu scrollbar-inner">
          <nav>
            <ul id="metismenu">
              <li className=" cp-user-active-page ">
                <a href="">
                  <span className="cp-user-icon">
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon"
                      alt=""
                    />
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon-hover"
                      alt=""
                    />
                  </span>
                  <span className="cp-user-name">{t("Dashboard")}</span>
                </a>
              </li>
              <li>
                <a className="arrow-icon" href="#" aria-expanded="true">
                  <span className="cp-user-icon">
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon"
                      alt=""
                    />
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon-hover"
                      alt=""
                    />
                  </span>
                  <span className="cp-user-name">{t("Wallet")}</span>
                </a>
                <ul>
                  <li>
                    <a href="">{t("My Wallet")}</a>
                  </li>
                  <li>
                    <a href="">{t("Swap Coin")}</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="arrow-icon" href="#" aria-expanded="true">
                  <span className="cp-user-icon">
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon"
                      alt=""
                    />
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon-hover"
                      alt=""
                    />
                  </span>
                  <span className="cp-user-name">{t("Reports")}</span>
                </a>
                <ul>
                  <li>
                    <a href="">{t("Deposit History")}</a>
                  </li>
                  <li>
                    <a href="">{t("Withdrawal History")}</a>
                  </li>
                  <li>
                    <a href="">{t("Swap History")}</a>
                  </li>
                  <li>
                    <a href="">{t("Buy Order History")}</a>
                  </li>
                  <li>
                    <a href="">{t("Sell Order History")}</a>
                  </li>
                  <li>
                    <a href="">{t("Transaction History")}</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="arrow-icon" href="#" aria-expanded="true">
                  <span className="cp-user-icon">
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon"
                      alt=""
                    />
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon-hover"
                      alt=""
                    />
                  </span>
                  <span className="cp-user-name">{t("My Profile")}</span>
                </a>
                <ul>
                  <li>
                    <a href="">{t("Profile")}</a>
                  </li>
                  <li>
                    <a href="">{t("Edit Profile")}</a>
                  </li>
                  <li>
                    <a href="">{t("Phone Verification")}</a>
                  </li>
                  <li>
                    <a href="">{t("Security")}</a>
                  </li>
                  <li>
                    <a href="">{t("Verification List")}</a>
                  </li>
                  <li>
                    <a href="">{t("Personal Verification")}</a>
                  </li>
                  <li>
                    <a href="">{t("Change Password")}</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="">
                  <span className="cp-user-icon">
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon"
                      alt=""
                    />
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon-hover"
                      alt=""
                    />
                  </span>
                  <span className="cp-user-name">{t("My Referral")}</span>
                </a>
              </li>
              <li>
                <a className="arrow-icon" href="#" aria-expanded="true">
                  <span className="cp-user-icon">
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon"
                      alt=""
                    />
                    <img
                      src=""
                      className="img-fluid cp-user-side-bar-icon-hover"
                      alt=""
                    />
                  </span>
                  <span className="cp-user-name">{t("Settings")}</span>
                </a>
                <ul>
                  <li>
                    <a href="">{t("My Settings")}</a>
                  </li>
                  <li>
                    <a href="">{t("FAQ")}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
