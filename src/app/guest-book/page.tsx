
import { getInvitation } from '@/actions/invitation.action';
import GuestBook from '@/components/GuestBook/GuestBook';
import { Invitation } from '@prisma/client';

export default async function Page() {
  // Fetch data
  const { invitation, error } = await getInvitation();

  if (error) {
    return (
      <div className="px-5 mx-auto mt-10 space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-2xl capitalize">Error</h1>
          <p className="text-sm text-gray-500">Failed to fetch invitation data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 mx-auto mt-10 space-y-6 w-full">
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-2xl capitalize">Buku tamu undangan</h1>
        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint atque quis ratione labore cum illum libero.</p>
      </div>
      <GuestBook invitation={invitation?.length !== 0 ? invitation as Invitation[] : [] } />
    </div>
  );
}
