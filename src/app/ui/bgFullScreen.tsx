import Image from "next/image";
export default function FullScreenBg() {
    return (<div className="absolute inset-0 -z-10 h-full w-full">
        <Image
            src="https://bing.ee123.net/img/rand"
            alt="background"
            fill
            className="object-cover brightness-50"
            priority
        />
    </div>);
}