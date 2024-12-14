import { getBank } from '@/actions/bank.action';
import { getInvitationGreeting } from '@/actions/invitationGreeting.action';
import { getInvited } from '@/actions/invited.action';
import { getWeding } from '@/actions/wedding.action';
import AddComments from '@/components/Comments/AddComment';
import AddDonation from '@/components/Donation/AddDonation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import formatDate from '@/lib/formatDate';
import MetaData from '@/lib/MetaData';
import { Bank, Wedding } from '@prisma/client';
import Image from 'next/image';
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

  // Fetch data
  const { invited, invitedError } = await getInvited(url); //user
  const { bank, errorBank } = await getBank(); //banklist
  const { wedding, error } = await getWeding(); //detail wedding
  const { invitationGreeting, errorInvitationGreeting } = await getInvitationGreeting(); //detail wedding

  if (!wedding || (Array.isArray(wedding) && wedding.length === 0) || !wedding || !invited || !bank || !invitationGreeting) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <div className="w-full container px-4 h-screen relative bg-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image width={500} height={500} src="/assets/bg.png" className="opacity-90 w-full h-full object-cover" alt="Background" />
        </div>
        <div className="flex flex-col items-center justify-around text-center h-full ">
          <div>
            <p className="text-2xl font-bold mb-2 arabic">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
            <p className="text-lg font-bold mb-2 text-center roboto">
              Assalamualaikum Wr. Wb
              <br />
              Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara resepsi pernikahan kami.
            </p>
          </div>

          <div className="text-center space-y-5 ">
            <div>
              <p className="text-5xl italianno">{wedding[0].groomName}</p>
              <p className="text-sm opensans">
                Putra dari Bapak {wedding[0].groomFatherName} & Ibu {wedding[0].groomMotherName}
              </p>
              <p className="text-sm opensans">Beralamat di {wedding[0].groomAddress}</p>
            </div>

            <div className="text-6xl italianno">&</div>

            <div>
              <p className="text-5xl italianno">{wedding[0].brideName}</p>
              <p className="text-sm opensans">
                Putri dari Bapak {wedding[0].brideFatherName} & Ibu {wedding[0].brideMotherName}
              </p>
              <p className="text-sm opensans">Beralamat di {wedding[0].brideAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <div className="!mt-0 bg-white p-8 rounded-lg text-center max-w-md mx-auto h-screen flex flex-col items-center justify-center">
        <Image width={500} height={500} src="/assets/bunga.png" alt="" className="mx-auto mb-4" />
        <div className="font-bold">
          <p className="text-lg font-semibold mb-4 roboto">We find love...</p>
          <p className="text-xl mb-4 arabic">وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِن يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِن فَضْلِهِ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ</p>
          <p className="text-base mb-4 roboto">
            “Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan orang-orang yang layak (berkawin) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. jika mereka miskin, Allah akan memampukan mereka
            dengan kurnia-Nya. dan Allah Maha Luas (pemberian-Nya) lagi Maha mengetahui.”
          </p>
          <p className="text-base font-semibold roboto">~ Q.S. An-Nur : 32 ~</p>
        </div>
        <Image width={500} height={500} src="/assets/bunga.png" alt="" className="mx-auto mt-4" />
      </div>

      {/* Section 2 */}
      <div className="space-y-20 flex flex-col justify-center items-center !mt-10">
        {/* Card 1 */}
        <div className="bg-[#f8e8d4] rounded-lg shadow-md p-6 relative w-80">
          <Image alt="" className="absolute -top-10 left-1/2 w-[230px] transform -translate-x-1/2" height={200} src="/assets/bunga.png" width={200} />
          <div className="text-center border-2 border-black p-4">
            <i className="fas fa-ring text-4xl mb-4"></i>
            <Image alt="" className="w-[50px] py-4 mx-auto transform" width={300} height={300} src="/assets/ring.png" />
            <h2 className="text-4xl italianno">Akad nikah</h2>
            <div className="mt-4 flex flex-col items-start space-y-2">
              <div className="flex items-center">
                <Image alt="Calendar icon" className="mr-2" height="20" src="/assets/tgl.png" width="20" />
                <span> {formatDate(new Date(wedding[0].akadDate).toISOString().split('T')[0])} </span>
              </div>
              <div className="flex items-center">
                <Image alt="Clock icon" className="mr-2" height="20" src="/assets/jam.png" width="20" />
                <span> {wedding[0].akadTime}-Selesai </span>
              </div>
              <div className="flex items-center">
                <Image alt="Location icon" className="mr-2" height="20" src="/assets/lok.png" width="20" />
                <span> {wedding[0].akadLocation} </span>
              </div>
            </div>
            <a className="mt- 6 inline-block w-full" href={wedding[0].akadGoogleMapLink} target="_blank">
              <button className="mt-6 bg-[#b08b5b] text-white py-2 px-4 rounded-full shadow-md w-full">OPEN MAP</button>
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f8e8d4] rounded-lg shadow-md p-6 relative w-80">
          <Image alt="" className="absolute -top-10 left-1/2 w-[230px] transform -translate-x-1/2" height={200} src="/assets/bunga.png" width={200} />
          <div className="text-center border-2 border-black p-4">
            <i className="fas fa-ring text-4xl mb-4"></i>
            <Image alt="" className="w-[50px] py-4 mx-auto transform" width={300} height={300} src="/assets/love.png" />
            <h2 className="text-4xl italianno">Resepsi</h2>
            <div className="mt-4 flex flex-col items-start space-y-2">
              <div className="flex items-center">
                <Image alt="Calendar icon" className="mr-2" height="20" src="/assets/tgl.png" width="20" />
                <span> {formatDate(new Date(wedding[0].resepsiDate).toISOString().split('T')[0])} </span>
              </div>
              <div className="flex items-center">
                <Image alt="Clock icon" className="mr-2" height="20" src="/assets/jam.png" width="20" />
                <span> {wedding[0].resepsiTime}-Selesai </span>
              </div>
              <div className="flex items-center">
                <Image alt="Location icon" className="mr-2" height="20" src="/assets/lok.png" width="20" />
                <span> {wedding[0].resepsiLocation} </span>
              </div>
            </div>
            <a className="mt-6 inline-block w-full" href={wedding[0].resepsiGoogleMapLink} target="_blank">
              <button className="mt-6 bg-[#b08b5b] text-white py-2 px-4 rounded-full shadow-md w-full">OPEN MAP</button>
            </a>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-white-100 flex justify-center">
        <div className="w-full max-w-2xl px-5">
          <h1 className="text-center text-2xl mb-8 roboto font-bold">GALERY</h1>

          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden">
                <Image className="shadow-md border rounded-lg w-full" height="400" src="/assets/wedding/image 27.png" width="300" alt="Image 3" />
              </div>
              <div className="rounded-lg overflow-hidden flex flex-col space-y-3 h-full">
                <Image className="shadow-md border rounded-lg w-full h-[45%]" height="400" src="/assets/wedding/image 28.png" width="300" alt="Image 1" />
                <Image className="shadow-md border rounded-lg w-full h-[45%]" height="400" src="/assets/wedding/image 29.png" width="300" alt="Image 2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden">
                <Image className="shadow-md border rounded-lg w-full" height="400" src="/assets/wedding/image 31.png" width="300" alt="Image 3" />
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image className="shadow-md border rounded-lg w-full" height="400" src="/assets/wedding/image 30.png" width="300" alt="Image 3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden">
                <Image className="shadow-md border rounded-lg w-full" height="400" src="/assets/wedding/image 32.png" width="300" alt="Image 3" />
              </div>
              <div className="rounded-lg overflow-hidden flex flex-col space-y-3 h-full">
                <Image className="shadow-md border rounded-lg w-full h-[45%]" height="400" src="/assets/wedding/image 34.png" width="300" alt="Image 1" />
                <Image className="shadow-md border rounded-lg w-full h-[45%]" height="400" src="/assets/wedding/image 33.png" width="300" alt="Image 2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden flex flex-col space-y-3 h-full">
                <Image className="shadow-md border rounded-lg w-full h-[45%]" height="400" src="/assets/wedding/image 36.png" width="300" alt="Image 1" />
                <Image className="shadow-md border rounded-lg w-full h-[45%]" height="400" src="/assets/wedding/image 37.png" width="300" alt="Image 2" />
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image className="shadow-md border rounded-lg w-full" height="400" src="/assets/wedding/image 35.png" width="300" alt="Image 3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="flex flex-col font-bold justify-center items-center text-center px-4">
        <h5 className="text-2xl uppercase roboto">Wedding Gift</h5>
        <p className="uppercase roboto">Bagi bapak/ibu/saudara/i yang ingin mengirimkan hadiah pernikahan dapat melalui tombol di bawah ini:</p>
        <AddDonation bank={bank as Bank[]} id={invited?.id as number} />
      </div>

      {/* Section 5 */}
      <AddComments lengthComment={invitationGreeting.length} id={invited.id}/>

      {/* Massage */}
      <div className="px-5 space-y-7">
        {
          invitationGreeting.map((data, idx)=>(
            <div key={idx} className="grid grid-cols-6">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/balalii.png" />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
          <div className="space-y-2 bg-[var(--secondary-color)] p-3 rounded-xl col-span-5 shadow-sm">
            <span className="font-semibold capitalize">{data.invitation.name}</span>
            <p>{data.greeting}</p>
          </div>
        </div>
        ))
      }

      </div>

      {/* Section 6 */}
      <div className="px-5 w-full flex flex-col space-y-8 justify-center">
        <Image width={500} height={500} src="/assets/img6.png" alt="Image" className="w-full rounded-xl border shadow-sm" />
        <h5 className="font-bold uppercase text-center text-base roboto">
          Atas kehadiran dan doa restu dari Bapak/Ibu/Saudara/i sekalian <br /> Kami mengucapkan <br /> Terima kasih. <br /> Wassalamualaikum Wr. Wb.
        </h5>
      </div>
    </>
  );
}
