
import { redirect } from 'next/navigation';
import { checkLogin } from "../lib/business-actions"
export default async function MessageHome() {
    //检查是否登录，否则跳转至登录界面
    if (! await checkLogin()) {
        redirect("/login/qrcode");
    } else {
        return "消息界面"
    }
}