import { checkLogin } from "@/app/lib/data";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PhoneNumberLoginPanel() {
    //检查如果已经登录，则直接跳转到消息界面首页
    if (await checkLogin()) {
        redirect("/home")
    }
    return (
        <div className="h-full flex items-center justify-center">

            <div >
                <h2 className="text-bold text-xl text-cyan-200">通过手机号码登录</h2>
                {/* 国家码 */}
                <label htmlFor="countryCode">国家码：</label>
                <input type="option" id="countryCode" className="input" defaultValue="+86" />
                {/* 手机号码输入框 */}
                <br />
                <label htmlFor="phoneNumberInput">手机号码：</label>
                <input
                    type="text"
                    id="phoneNumberInput"
                    className="input"
                    placeholder="请输入手机号码"
                />
                <div className="flex justify-center mt-4 ">
                    <Link href={"/login/qrcode"}>
                        <div className="text-lg text-white bg-blue-500 rounded-full p-4 px-16 hover:bg-blue-400">
                            扫描二维码登录
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}