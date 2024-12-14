
import { getBank } from '@/actions/bank.action';
import { getDonation } from '@/actions/donation.action';
import DonationPage from '@/components/Donation/DonationPage';
import type { Donation } from '@prisma/client';
import { Bank } from '@prisma/client';


export default async function Page() {
  // Fetch data
  const { donation, errorDonation } = await getDonation();
  const { bank, errorBank } = await getBank();

  if (errorBank || errorDonation) {
    return (
      <div className="px-5 mx-auto mt-10 space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-2xl capitalize">Error</h1>
          <p className="text-sm text-gray-500">Failed to fetch Bank data.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="px-5 mx-auto mt-10 space-y-6 w-full">
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-2xl capitalize">Sumbangan Tamu Undangan</h1>
        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint atque quis ratione labore cum illum libero.</p>
      </div>
       <DonationPage donation={donation as Donation[]} bank={bank as Bank[]}/>
    </div>
  );
}
