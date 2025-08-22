"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { getQrCodeParam, setAuthState } from "../lib/gloableData";
import { redirect } from "next/navigation";
import { initTelegram } from "../lib/business";

const QR_SIZE = 280;
const DATA_PREFIX = "tg://login?token=";

export default function QrcodeImage() {
    const ref = useRef<HTMLDivElement>(null);
    const qrRef = useRef<QRCodeStyling | null>(null);
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        //请求 QrCodeParam的useEffect
        console.log("请求 QrCodeParam的useEffect");
        async function fetchData() {
            const client = await initTelegram();
            const isLogin = await client.checkAuthorization();
            console.log("==> checkAuthorization=", isLogin);
            await setAuthState({ isLogin: isLogin })
            if (isLogin) {
                redirect("/home");
            } else {
                redirect('/qrcode');
            }
        }
        fetchData();
    }, []);
    // 初始化二维码
    useEffect(() => {
        qrRef.current = new QRCodeStyling({
            width: QR_SIZE,
            height: QR_SIZE,
            image: "/blank.png",
            type: "svg",
            dotsOptions: { type: "rounded" },
            cornersSquareOptions: { type: "extra-rounded" },
        });

        if (ref.current && qrRef.current) {
            qrRef.current.append(ref.current);
        }
    }, []);

    // 轮询后端
    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await getQrCodeParam()
            console.log("interval data", data)
            if (data?.token && data.token !== token) {
                setToken(data.token); // 更新 state
                console.log("setToken(data.token)", data)
            }
        }, 5000); // 每2秒轮询
        return () => clearInterval(interval);
    }, [token]);

    // 更新二维码
    useEffect(() => {
        if (token && qrRef.current) {
            qrRef.current.update({ data: `${DATA_PREFIX}${token}` });
        }
    }, [token]);

    return <div ref={ref} style={{ width: QR_SIZE, height: QR_SIZE }} />;
}
