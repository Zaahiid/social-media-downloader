import FooterEditor from "@/components/admin/footer-editor";
import { AlertDestructive } from "@/components/global/error";
import { getFooterData } from "@/lib/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Footer editor",
};

const ContactEditorPage = async () => {
  let res;
  try {
    res = await getFooterData();
  } catch (error) {
    console.error("Error in contact editor page: ", error);
    res = error;
  }

  if (res === "error") {
    return <AlertDestructive message={JSON.stringify(res)} />;
  }

  return <FooterEditor footer={res?.footer} />;
};

export default ContactEditorPage;