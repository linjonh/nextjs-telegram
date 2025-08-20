import Image from "next/image";
import { loadQrcode } from "../lib/data";
export default async function QrcodeImage() {
    const url = await loadQrcode();
    return (
        <div className={`h-[200px] w-[200px] rounded-xl bg-gray-200 p-1 shadow-sm m-10`}
        >
            <Image
                className="rounded-xl x-full h-full bg-gray-400"
                id="qrcodeImg"
                src={url}
                alt="二维码"
                width={200}
                height={200}
            />
        </div>
    );
}