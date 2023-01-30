import { Breadcrumb } from "components/Breadcrumb";
import { SingleLaunchPad } from "components/ico/SingleLaunchPad";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLaunchpadListDetailsAction } from "state/actions/launchpad";
import { GetServerSideProps } from "next";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { customPage, landingPage } from "service/landing-page";
import { parseCookies } from "nookies";
import Footer from "components/common/footer";
import DynamicLoading from "components/common/dynamicLoading";

export default function SingleLaunchPadPage({
  customPageData,
  socialData,
  copyright_text,
}: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [launchpadListDetails, setLaunchpadListDetails]: any = useState([]);
  useEffect(() => {
    getLaunchpadListDetailsAction(
      setLaunchpadListDetails,
      router.query.id,
      setLoading
    );
  }, []);

  return (
    <>
      {loading ? (
        <DynamicLoading count={13} width={"60%"} />
      ) : (
        <>
          <Breadcrumb leftButton={true} leftUrl="/ico" />
          <SingleLaunchPad data={launchpadListDetails?.data} />
          <Footer
            customPageData={customPageData}
            socialData={socialData}
            copyright_text={copyright_text}
          />
        </>
      )}
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/profile");
  const { id, edit } = ctx.query;
  const { data } = await landingPage();
  const { data: customPageData } = await customPage();
  const cookies = parseCookies(ctx);

  return {
    props: {
      id: id,
      edit: edit ? edit : null,
      socialData: data.media_list,
      copyright_text: data?.copyright_text,
      customPageData: customPageData.data,
    },
  };
};
