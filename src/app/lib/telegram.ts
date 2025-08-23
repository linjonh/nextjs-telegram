import { redirect } from "next/navigation"
import { initTelegram } from "./business-actions"
import { setAuthState } from "./gloableData"

export async function fetchData() {
    console.log("请求 QrCodeParam的useEffect")
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