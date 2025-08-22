"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TelegramClient } from "telegram";
import { UserAuthParams } from "telegram/client/auth";
import { getAuthController, getAuthState, getQrCodeParam, getStoreSession, getStringSession, setAuthController, setAuthState, setQrCodeParam, setStringSession } from "./gloableData";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const userAuthParams: UserAuthParams = {
  phoneNumber: async () => {
    console.log("Please enter your phoneNumber:");
    return new Promise(async (resolve) =>
      (await getAuthController()).resolve = resolve
    );
  },
  password: async () => {
    console.log("Please enter your password:");
    return new Promise(async (resolve) =>
      (await getAuthController()).resolve = resolve

    );
  },
  phoneCode: async () => {
    console.log("Please enter the code you received:");
    return new Promise(async (resolve) =>
      (await getAuthController()).resolve = resolve

    );
  },
  qrCode: async (qrcode) => {
    console.log("Please scan the QR code below:");
    const expires = qrcode.expires;
    const token = qrcode.token.toString("base64url");
    console.log(token);
    const date = new Date(expires * 1000);
    // console.log(date.toISOString()); // 2025-09-21T09:59:08.000Z
    console.log(date.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }));
    await setQrCodeParam({ token: token, expires: expires })
    // redirectPage()
    return new Promise(async (resolve, reject) => {
      await setAuthController({ resolve: resolve, reject: reject })
      console.log("setAuthController: ", (await getAuthController()).reject)
    }
    );
  },
  onError: (err) => console.log(err),
}

export async function loadQrcode() {
  await delay(400);
  return "/img.png";
}

export async function switchToQrcodeAction() {
  console.log("switchToQrcodeAction");
  revalidatePath('/');
  redirect('/');
}

export async function checkLogin() {
  const authState = await getAuthState()
  console.log(`checkLogin ${authState.isLogin}`);
  return authState.isLogin
}
export async function updateAuthState(state: boolean) {
  await setAuthState({ isLogin: state })
  console.log(`checkLogin ${state}`);
  return null
}
declare global {
  var client: TelegramClient | undefined;
}

export async function initTelegram() {
  const apiIdEnv = process.env.TELEGRAM_API_ID;
  const apiHashEnv = process.env.TELEGRAM_API_HASH;

  if (!apiIdEnv) {
    throw new Error("Missing environment variable: TELEGRAM_API_ID");
  }
  if (!apiHashEnv) {
    throw new Error("Missing environment variable: TELEGRAM_API_HASH");
  }

  const apiId = Number(apiIdEnv);
  if (Number.isNaN(apiId)) {
    throw new Error("Invalid TELEGRAM_API_ID: must be a number");
  }

  const storeSession = await getStoreSession()
  console.log("====>start: stringSession.authKey:", global.stringSession.authKey, "storeSession: ", global.stringSession)
  if (!global.client) {
    global.client = new TelegramClient(global.stringSession, apiId, apiHashEnv, {});
  }
  // await client.start(userAuthParams);
  // console.log("You should now be connected.");
  // console.log(client.session.save()); // Save this string to avoid logging in again
  // await client.sendMessage("me", { message: "Hello!" });
  // function redirectPage() {
  //   revalidatePath('/qrcode')
  //   redirect('/qrcode');
  // }
  await global.client.connect()
  const user = await global.client.signInUserWithQrCode({ apiId: apiId, apiHash: apiHashEnv }, {
    qrCode: async (qrcode) => {
      console.log("Please scan the QR code below:");
      const expires = qrcode.expires;
      const token = qrcode.token.toString("base64url");
      console.log(token);
      const date = new Date(expires * 1000);
      // console.log(date.toISOString()); // 2025-09-21T09:59:08.000Z
      console.log(date.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }));
      const authQrcode = { token: token, expires: expires };
      await setQrCodeParam(authQrcode)
      return new Promise(async (resolve, reject) => {
        await setAuthController({ resolve: resolve, reject: reject })
        console.log("setAuthController: ", (await getAuthController()).reject)
      }
      );
    },
    password: async (hint) => {
      console.log("Please enter your password: hint:", hint);
      //通知客户端更新UI界面，展示输入密码界面
      return new Promise(async (resolve) =>
        await setAuthController({ resolve: resolve })
      );
    },
    onError: (err) => {
      console.log("signInUserWithQrCode出现错误了：", err);
    },
  })
  console.log(global.client.session.save()); // Save this string to avoid logging in again
  await setStringSession(global.stringSession);
  console.log("====>storeSession.authKey:", global.stringSession.authKey, "storeSession: ", global.stringSession)
  console.log("user=", user)
  return global.client;
}
