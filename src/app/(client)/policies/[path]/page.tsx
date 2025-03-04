import { TypographyH1 } from "@/components/custom/typography";
import { AlertDestructive } from "@/components/global/error";
import { getPolicyPageCachedData } from "@/lib/cache-data";
import { Policy, policies, policyRoute } from "@/lib/database/db";
import { getCleanPath } from "@/lib/utils";
import { Metadata } from "next";

export function generateStaticParams() {
  const path = getCleanPath(policyRoute);
  return path;
}

export async function generateMetadata({
  params,
}: {
  params: { path: string };
}): Promise<Metadata> {
  let res;
  try {
    res = await getPolicyPageCachedData();
  } catch (error) {
    console.error("Error in Policy page: ", error);
    res = "error";
  }

  console.log("policy: ", res);
  

  const dynamicPolicies: Policy[] = res["policy-cont"];

  const filterContent = dynamicPolicies.find(
    (content, i) => content.page === `/${params.path}`
  );

  return {
    title: filterContent?.metaTitle,
    description: filterContent?.metaDescription,
    keywords: filterContent?.keywords,
  };
}

const Policies = async ({ params }: { params: { path: string } }) => {
  let res;
  try {
    res = await getPolicyPageCachedData();
  } catch (error) {
    console.error("Error in Policy page: ", error);
    res = { type: "error", error };
  }

  if (res.type === "error") {
    return <AlertDestructive message={JSON.stringify(res.error)} />;
  }

  const dynamicPolicies: Policy[] = res["policy-cont"];

  const filterContent = dynamicPolicies.filter((content, i) => {
    return content.page === `/${params.path}`;
  });

  return (
    <div>
      <TypographyH1 className="my-8">{filterContent[0]?.title}</TypographyH1>

      {filterContent[0]?.description && (
        <div
          dangerouslySetInnerHTML={{ __html: filterContent[0].description }}
        />
      )}
    </div>
  );
};

export default Policies;