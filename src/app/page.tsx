
import { redirect } from 'next/navigation';
import { checkLogin } from './lib/data';

export default async function Home() {
  if (await checkLogin()) {
    redirect("/home")
  } else {
    redirect('/login/qrcode');
  }
  return null;
}
