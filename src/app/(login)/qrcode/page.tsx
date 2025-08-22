import { initTelegram } from "@/app/lib/business-actions"
import { setAuthState } from "@/app/lib/gloableData"
import { QrcodeImgSkeleton } from "@/app/ui/skeleton"
import Link from "next/link"
import { Suspense } from "react"
import { QrCodeImage } from "@/app/ui/qrcode-image"
import { ServerQrCodeImage } from "@/app/ui/server-qrcode-image"
import { redirect } from "next/navigation"

export default async function QRcodeLoginPanel() {

    console.log("请求 QrCodeParam的useEffect")
    async function fetchData() {
      try {
        const client = await initTelegram()
        const isLogin = await client.checkAuthorization()
        console.log("==> checkAuthorization=", isLogin)
        await setAuthState({ isLogin: isLogin })

        if (isLogin) {
          redirect("/home")
        } else {
          redirect("/qrcode") // Show QR code if not logged in
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      }
    }
    fetchData()

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg px-50 py-20 text-white ">
        <h2 className="text-bold text-xl text-cyan-200">通过二维码登录</h2>
        <Suspense fallback={<QrcodeImgSkeleton />}>
          <ServerQrCodeImage />
        </Suspense>
        <ol className="font-mono list-inside list-decimal text-sm/6 sm:text-left">
          <li className="tracking-[-.01em]">打开手机上的Telegram APP</li>
          <li className="tracking-[-.01em]">导航到设置&gt;设备&gt;连接至桌面设备界面</li>
          <li className="tracking-[-.01em]">在手机该界面上点击的扫描二维码按钮登录</li>
        </ol>
        <div className="flex justify-center mt-4">
          <Link href={"/phone"}>
            <div className="text-lg text-white bg-blue-500 rounded-full p-4 px-16 hover:bg-blue-400">
              使用手机号码登录
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
