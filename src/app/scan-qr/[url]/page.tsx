import { getInvited } from '@/actions/invited.action';
import QRScanner from '@/components/QRScanner/QRScanner';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ url: string }> }) {
  const url = (await params).url;
    const { invited, invitedError } = await getInvited(url); //user

      if (!invited ) {
        notFound();
      }
      
  return (
    <div className="h-screen pt-20 bg-white px-10">
      <QRScanner url={url}/>
    </div>
  );
}
