import { getSpecificBank } from '@/actions/bank.action';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
   const id = (await params).id;

  // Fetch data
  const { bank, errorBank } = await getSpecificBank(id); //banklist

  if ( !bank) {
    notFound();
  }
  return (
    <div className="h-[90%] pt-20 bg-white px-10">
      
      <div className="">
      <Image alt="" className="mb-6 w-[230px] " height={200} src="/assets/bunga.png" width={200} />
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">Cara pembayaran</p>

        <p className="mt-4 mb-3 ">Lakukan transfer melalui ATM, Mobile Banking, atau Internet Banking ke rekening berikut:</p>

        <ol className="list-decimal list-inside mb-3">
          <li>
            Pilih Bank: <b>{bank?.name}</b>
          </li>
          <li>
            Masukan Nomor Rekening: <b>{bank?.accountNumber}</b>
          </li>
          <li>
            Pastikan Nama Penerima: <b className='uppercase'>{bank?.recipient}</b>
          </li>
          <li>Masukan nominal transfer</li>
          <li>Selesai.</li>
        </ol>

        <p className="">
          Kami mengucapkan terima kasih yang sebesar-besarnya atas sumbangan yang telah Bapak/Ibu berikan. <br /> Salam hangat,
        </p>
        {/* <Link href="/invitation" className="mt-6 inline-block rounded-full bg-[var(--primary-color)] px-10 py-3 text-sm  text-white font-semibold">
          Kembali
        </Link> */}
      </div>
    </div>
  );
}
