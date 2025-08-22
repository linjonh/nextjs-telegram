
import { redirect } from 'next/navigation';
import { checkLogin } from '@/app/lib/business-actions';

export default async function Home() {
  if (await checkLogin()) {
    redirect("/home")
  } else {
    redirect('/qrcode');
  }
  return null;
}
