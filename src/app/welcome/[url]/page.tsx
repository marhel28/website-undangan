import { getInvited } from '@/actions/invited.action';
import MetaData from '@/lib/MetaData';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ url: string }> }) {
  const url = (await params).url;
  const { invited, invitedError } = await getInvited(url); //user


  try {
    return await MetaData({
      title: `Kepada: ${invited?.name}`,
      desc: ` Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara resepsi pernikahan kami. `,
      imgUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/wedding/1.png`,
      linkUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/welcome/${invited?.code}`,
    });
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    };
  }
}


export default async function Page({ params }: { params: Promise<{ url: string }> }) {
  const url = (await params).url;
    const { invited, invitedError } = await getInvited(url); //user
  

      if (!invited ) {
        notFound();
      }
    
  return (
    <main>
      <div className="container md:w-[500px] px-4  h-max-screen h-screen bg-white mx-auto flex flex-col items-center justify-center space-y-2">
        <h1 className="text-6xl italianno text-gray-800">Wedding Invitation</h1>

        <Image width={500} height={500} src="/assets/floraltop.png" alt="" className="w-3/4 mx-auto" />

        <h2 className="italianno text-6xl waterbrush text-gray-700 mt-4">Halim & Nisa</h2>

        <Image width={500} height={500} src="/assets/floralbottom.png" alt="" className="w-3/4 mx-auto" />

        <div className="!py-8 text-2xl capitalize">
          <span className="italianno">Kepada: {invited.name}</span>
        </div>
        <div className="space-y-5 w-full flex flex-col">
          <Link href={`/invited/${invited.code}`} className="bg-[var(--primary-color)] border border-[var(--primary-color)] text-white rounded-full pt-2.5 pb-3 w-full shadow-lg capitalize font-bold text-center">
            Buka Undangan
          </Link>
          <Link
            href={`/scan-qr/${invited.code}`}
            className="bg-transparant border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white rounded-full pt-2.5 pb-3 w-full shadow-lg capitalize font-bold text-center"
          >
            Scan QR
          </Link>
        </div>
      </div>
    </main>
  );
}
