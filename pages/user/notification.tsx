import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { notification } from "service/notification";
import { RootState } from "state/store";
import { GetServerSideProps } from "next";
import { customPage, landingPage } from "service/landing-page";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import Footer from "components/common/footer";
import { IoMdNotificationsOutline } from "react-icons/io";
const NotificationPage = ({
  customPageData,
  socialData,
  copyright_text,
}: any) => {
  const { t } = useTranslation("common");
  const [notificationData, setNotification] = useState<any>([]);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const getNotifications = async () => {
    const data = await notification();
    setNotification(data.data.data);
  };
  useEffect(() => {
    isLoggedIn && getNotifications();
  }, [isLoggedIn]);
  return (
    <>
      <div className="container notification-continer mb-2">
        <h2 className="section-top-title notification-section-title">
          {t("All notifications")}
        </h2>
      </div>

      <div className="notification-section marginLeftRight">
        <div className="container">
          <div className="row">
            {notificationData?.length > 0 ? (
              notificationData?.map((item: any, index: any) => (
                <div key={`notify${index}`} className="notify-grid boxShadow">
                  <div className="notify-content">
                    <p className="icon-title">
                      <div>
                        <IoMdNotificationsOutline
                          className={
                            true
                              ? "notifyUnread notifyUnreadIcon"
                              : "notifyRead"
                          }
                          size={25}
                        />
                      </div>

                      <span className={true ? "titleUnread" : ""}>
                        {item?.title}
                      </span>
                    </p>
                    <p className={true ? "titleUnread" : ""}>
                      {item?.notification_body}
                    </p>
                  </div>
                  <div className="notify-date">
                    <p>{moment(item.created_at).format("DD MMM YYYY")}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center notificationNotFound">
                {t("No Notification!")}
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer
        customPageData={customPageData}
        socialData={socialData}
        copyright_text={copyright_text}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/notification");
  const { data } = await landingPage();
  const { data: customPageData } = await customPage();
  return {
    props: {
      socialData: data.media_list,
      copyright_text: data?.copyright_text,
      customPageData: customPageData.data,
    },
  };
};
export default NotificationPage;
