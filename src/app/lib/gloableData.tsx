"use server"
import { StoreSession, StringSession } from "telegram/sessions";

// 确保全局对象初始化
declare global {
    var qrCodeParam: { token: string; expires: number } | undefined;
    var stringSession: StringSession;

}

if (!global.qrCodeParam) {
    global.qrCodeParam = { token: "未初始化", expires: 0 };
}
if (!global.stringSession) {
    global.stringSession = new StringSession("");
}
// 内部变量
let authState = { isLogin: false };
let storeSession = new StoreSession("./account_session");
let authController: { resolve?: Function; reject?: Function } = {};

// 只导出异步函数
export async function getAuthState() {
    return authState;
}
export async function setAuthState(newState: { isLogin: boolean }) {
    authState = newState;
}

export async function getQrCodeParam() {
    return global.qrCodeParam;
}


export async function setQrCodeParam(newParam: { token: string; expires: number }) {
    global.qrCodeParam = newParam;
    console.log("setQrCodeParam=", global.qrCodeParam)
}

export async function getStringSession() {
    return global.stringSession;
}
export async function setStringSession(newSession: StringSession) {
    global.stringSession = newSession;
}

export async function getStoreSession() {
    return storeSession;
}
export async function setStoreSession(newSession: StoreSession) {
    storeSession = newSession;
}

export async function getAuthController() {
    return authController;
}
export async function setAuthController(newController: { resolve?: Function; reject?: Function }) {
    authController = newController;
}