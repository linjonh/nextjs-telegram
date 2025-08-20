"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function loadQrcode() {
    await delay(400);
    return "/img.png";
}

export async function switchToQrcodeAction() {
    // 重新验证路径，确保状态更新
    // 这可能是一个 Next.js 的特性，用于强制重新加载页面
    // 这里的路径是根路径，可能是为了刷新整个页面
    console.log("switchToQrcodeAction");
    revalidatePath('/');
    redirect('/');
}
export async function checkLogin() {
    console.log("checkLogin delay 100");
    await delay(100);

    return false
}