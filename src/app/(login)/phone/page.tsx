import { checkLogin } from "@/app/lib/business-actions";
import Link from "next/link";

import { redirect } from "next/navigation";

export default async function PhoneNumberLoginPanel() {
    //检查如果已经登录，则直接跳转到消息界面首页
    if (await checkLogin()) {
        redirect("/home")
    }
    return (
        <div className="h-full flex items-center justify-center">
            <div className="rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg px-50 py-20 text-white ">
                <div className="flex justify-center items-center">
                    <h2 className="text-bold text-xl text-cyan-200 mb-20">通过手机号码登录</h2>
                </div>
                {/* 国家码 + 手机号码输入（优化样式与可访问性） */}
                <div className="w-full max-w-md mx-auto">
                    <label htmlFor="phoneInput" className="block text-sm font-medium text-cyan-100 mb-2">
                        手机号码
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            id="countryCode"
                            name="countryCode"
                            list="countryCodes"
                            inputMode="tel"
                            pattern="^\+\d{1,4}$"
                            placeholder="+86"
                            className="appearance-none bg-white/5 w-20 text-white px-3 py-2 rounded-l-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                            aria-label="国家码（可输入或从建议中选择）"
                        />
                        <datalist id="countryCodes">
                            <option value="+86">中国</option>
                            <option value="+1">美国</option>
                            <option value="+44">英国</option>
                        </datalist>

                        <input
                            type="tel"
                            id="phoneInput"
                            name="phoneNumber"
                            inputMode="tel"
                            placeholder="例如：13800138000"
                            className="flex-1 px-4 py-2 rounded-r-lg bg-white/5 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                            aria-label="手机号码"
                            maxLength={15}
                        />
                    </div>

                    <p className="mt-2 text-xs text-white/60">
                        我们将发送验证码到该号码，运营商可能会收取短信费用。
                    </p>
                </div>
                <div className="flex justify-center mt-20 ">
                    <Link href={"/qrcode"}>
                        <div className="text-lg text-white bg-blue-500 rounded-full p-4 px-16 hover:bg-blue-400">
                            扫描二维码登录
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}