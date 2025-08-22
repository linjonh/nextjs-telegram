import { redirect } from 'next/navigation';
import { checkLogin, initTelegram } from './lib/business';
export default async function Home() {

  if (await checkLogin()) {
    redirect("/home");
  } else {
    redirect('/qrcode');
  }
  return "初始化中...";
}
