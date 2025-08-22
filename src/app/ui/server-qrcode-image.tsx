"use server"
import QRCode from "qrcode"
import { getAuthController, getQrCodeParam, setQrCodeParam } from "../lib/gloableData";
import Image from "next/image";
import { checkLogin, delay } from "../lib/business-actions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const QR_SIZE = 280;
const DATA_PREFIX = "tg://login?token=";
interface ServerQRGeneratorProps {
  text?: string;//Data数据
  format?: "svg" | "png";
  options?: any;
}
export async function ServerQrCodeImage({ text = "", format = "svg", options = {} }: ServerQRGeneratorProps) {
  //请求QRcode 地址token
  let param: { token: string, expires: number } | undefined = { token: "", expires: 0 };

  param = await getQrCodeParam();
  console.log("loop getQrCodeParam", param);

  text = text || (param?.expires !== 0 ? `${DATA_PREFIX}${param?.token}` : text)
  console.log("loop getQrCodeParam text", text);
  function getTimeExpiresInfoAndTokenInfoHtml() {
    if (param) {

      const date = new Date(param?.expires * 1000);
      const time = date.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
      // console.log(date.toISOString()); // 2025-09-21T09:59:08.000Z
      console.log(time);
      return (<div><p>过期时间：{time} (时区：亚洲/上海)</p><p>Token：{param.token}</p></div>);
    }
    return "";
  }
  // if (param?.expires) {
  //   setTimeout(() => {
  //     (async () => {
  //       const isLogin = await checkLogin()
  //       console.log("isLogin", isLogin);
  //       if (!isLogin) {
  //         const control = await getAuthController()
  //         if (control?.reject) {
  //           control?.reject()
  //         }
  //         await setQrCodeParam({ token: "reset", expires: 0 });
  //         console.log("reset setQrCodeParam and redirect /qrcode");
  //         revalidatePath("/qrcode")
  //         redirect("/qrcode");
  //       }
  //     })();
  //   }, param?.expires - Date.now() - 300);
  // }

  if (text)
    try {
      if (format === "svg") {
        const svgString = await QRCode.toString(text, {
          type: "svg",
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
          ...options,
        })

        return (
          <div>
            <div className="flex justify-center items-center">
              <div dangerouslySetInnerHTML={{ __html: svgString }} />
            </div>
            {getTimeExpiresInfoAndTokenInfoHtml()}
          </div>

        )
      } else if (format === "png") {
        const dataUrl = await QRCode.toDataURL(text, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
          ...options,
        });

        return (
          <div>
            <div className="flex justify-center">
              <Image src={dataUrl || "/blank.png"} alt="QR Code" className="max-w-full" />

            </div>
            {getTimeExpiresInfoAndTokenInfoHtml()}
          </div>

        )
      }

    } catch (error) {
      console.error("服务端生成 QR 码时出错:", error)
      return <div className="flex justify-center p-4 text-red-500">生成 QR 码失败</div>
    }
  return <div className="flex justify-center p-4 text-gray-500">无法生成 QR 码</div>
}