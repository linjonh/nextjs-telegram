import Image from "next/image";
import Footer from "./footer";
function QRcodeLoginPanel() {
  return (
    <div>
      <h2>通过二维码登录</h2>
      <div className="flex flex-col items-center justify-center">
      <Image id="qrcodeImg" src="/qrcode.png" alt="二维码" width={100} height={100} />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="tracking-[-.01em]">打开手机上的Telegram APP</li>
          <li className="tracking-[-.01em]">
            导航到设置&gt;设备…&gt;连接至桌面设备界面
          </li>
          <li className="tracking-[-.01em]">
            在手机该界面上点击的扫描二维码按钮登录
          </li>
        </ol>
        <button className="bg:dark round mt-6" type="button" id="switchPhoneNumber">使用手机号码登录</button>
      </div>
    </div>
  );
}
function PhoneNumberLoginPanel() {
  return (
    <div>
      <h2>通过手机号码登录</h2>
      {/* 国家码 */}
      <label htmlFor="countryCode">国家码：</label>
      <input type="option" id="countryCode" className="input w-[80px]" defaultValue="+86"/>
      {/* 手机号码输入框 */}
      <br />
      <label htmlFor="phoneNumberInput">手机号码：</label>
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          id="phoneNumberInput"
          className="input"
          placeholder="请输入手机号码"
        />
        <button className="bg:dark round mt-6" type="button" id="sendCodeButton">下一步</button>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <QRcodeLoginPanel />
        <PhoneNumberLoginPanel />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
