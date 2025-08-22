import QRCodeStyling from "qr-code-styling";
import { getQrCodeParam } from "../lib/gloableData";
import Image from "next/image";
const QR_SIZE = 280;
const DATA_PREFIX = "tg://login?token=";
interface ServerQRGeneratorProps {
    text?: string;//Data数据
    format?: "svg" | "png";
    options?: any;
}
export async function ServerQrCodeImage({ text, format = "svg", options = {} }: ServerQRGeneratorProps) {
    //请求QRcode 地址token
    let param: { token: string, expires: number } | undefined = { token: "", expires: 0 };
    do {
        param = await getQrCodeParam();
    } while (param?.expires === 0)

    const data = `${DATA_PREFIX}${param?.token}` || text

    const qrCode = new QRCodeStyling({
        width: QR_SIZE,
        height: QR_SIZE,
        image: "/blank.png",
        type: "svg",
        data: data,
        dotsOptions: { type: "rounded" },
        cornersSquareOptions: { type: "extra-rounded" },
        ...options
    });
    try {
        if (format === "svg") {
            const svgBlob = await qrCode.getRawData("svg")
            if (svgBlob instanceof Blob) {
                const svgText = await svgBlob.text();
                return (
                    <div className="flex justify-center">
                        <div dangerouslySetInnerHTML={{ __html: svgText }} />
                    </div>
                )
            }
        } else if (format === "png") {
            const pngBlob = await qrCode.getRawData("png")
            if (pngBlob instanceof Blob) {
                const arrayBuffer = await pngBlob.arrayBuffer()
                const uint8Array = new Uint8Array(arrayBuffer)
                const base64 = Buffer.from(uint8Array).toString("base64")
                const dataUrl = `data:image/png;base64,${base64}`
                return (
                    <div className="flex justify-center">
                        <Image src={dataUrl || "/blank.png"} alt="QR Code" className="max-w-full" />
                    </div>
                )
            }
        }
    } catch (error) {
        console.error("服务端生成 QR 码时出错:", error)
        return <div className="flex justify-center p-4 text-red-500">生成 QR 码失败</div>
    }
    return <div className="flex justify-center p-4 text-gray-500">无法生成 QR 码</div>
}