"use client"
import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { getQrCodeParam } from "../lib/gloableData"
import { delay } from "../lib/business-actions"

const DATA_PREFIX = "tg://login?token="

export function QrCodeImage() {
  const [qrCodeSvg, setQrCodeSvg] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function generateQrCode() {
      try {
        let param: { token: string; expires: number } | undefined = { token: "", expires: 0 }

        // Poll for QR code parameters
        do {
          param = await getQrCodeParam()
          console.log("loop getQrCodeParam", param)
          if (param?.expires === 0) {
            await delay(5000)
          }
        } while (param?.expires === 0)

        const text = `${DATA_PREFIX}${param?.token}`

        const svgString = await QRCode.toString(text, {
          type: "svg",
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        })

        setQrCodeSvg(svgString)
      } catch (error) {
        console.error("生成 QR 码时出错:", error)
        setError("生成 QR 码失败")
      }
    }

    generateQrCode()
  }, [])

  if (error) {
    return <div className="flex justify-center p-4 text-red-500">{error}</div>
  }

  if (!qrCodeSvg) {
    return <div className="flex justify-center p-4 text-gray-500">正在生成 QR 码...</div>
  }

  return (
    <div className="flex justify-center">
      <div dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
    </div>
  )
}
