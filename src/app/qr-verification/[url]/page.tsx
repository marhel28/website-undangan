import { getInvited, updateInvited } from '@/actions/invited.action';
import Loading from '@/app/loading';
import { BookCheck } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ url: string }> }) {
  const url = (await params).url;
  const { success, invitedError } = await updateInvited(url); //user
  

if (success) {
  return (
    <main className="min-h-[80vh]">
      <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
        <div className="flex items-center gap-4">
          <span className="shrink-0 rounded-full bg-[var(--primary-color)] p-2 text-white">
            <BookCheck />
          </span>

          <p className="font-medium sm:text-lg">Scan QR berhasil!</p>
        </div>

        <p className="mt-4 text-gray-500">
          <b>Terima kasih!</b> Buku tamu Anda telah berhasil terisi, <br />
          <br /> Kehadiran dan doa restu Anda sangat berarti bagi kami dalam memulai babak baru kehidupan bersama. <br />
          Semoga momen indah ini menjadi kenangan yang tak terlupakan.
        </p>

        <div className="mt-6 sm:flex sm:gap-4">
          <a className="inline-block w-full rounded-lg bg-[var(--primary-color)] px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto" href={`${process.env.NEXT_PUBLIC_BASE_URL}/invited/${url}`}>
            Kembali ke undangan
          </a>
        </div>
      </div>
    </main>
  );
} else {
  return <Loading/>
}
      
}
