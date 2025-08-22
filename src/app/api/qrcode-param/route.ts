// app/api/qrcode-param/route.ts
import { getQrCodeParam } from "@/app/lib/gloableData";
import { NextResponse } from "next/server";

export async function GET() {
    const param = await getQrCodeParam();
    console.log("route getQrCodeParam=", param)
    return NextResponse.json(param);
}
