import { getWeding } from '@/actions/wedding.action';
import FormSettings from '@/components/Settings/FormSettings';
import { Wedding } from '@prisma/client';

export default async function Page() {
  // Fetch data
  const { wedding, error } = await getWeding();

  if (error) {
    return (
      <div className="px-5 mx-auto mt-10 space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-2xl capitalize">Error</h1>
          <p className="text-sm text-gray-500">Failed to fetch wedding data.</p>
        </div>
      </div>
    );
  }

  if (!wedding || (Array.isArray(wedding) && wedding.length === 0)) {
    return (
      <div className="px-5 mx-auto mt-10 space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-2xl capitalize">No Data</h1>
          <p className="text-sm text-gray-500">Wedding data is not available.</p>
        </div>
      </div>
    );
  }

  // If wedding is an array, extract the first item (adjust as needed)
  const weddingItem = Array.isArray(wedding) ? wedding[0] : wedding;

  // Map the data to the Wedding interface
  const formattedWedding: Wedding = {
    id: weddingItem.id,
    groomName: weddingItem.groomName,
    groomMotherName: weddingItem.groomMotherName,
    groomFatherName: weddingItem.groomFatherName,
    groomAddress: weddingItem.groomAddress,
    brideName: weddingItem.brideName,
    brideMotherName: weddingItem.brideMotherName,
    brideFatherName: weddingItem.brideFatherName,
    brideAddress: weddingItem.brideAddress,
    akadDate: weddingItem.akadDate,
    akadTime: weddingItem.akadTime,
    akadLocation: weddingItem.akadLocation,
    akadGoogleMapLink: weddingItem.akadGoogleMapLink,
    resepsiDate: weddingItem.resepsiDate,
    resepsiTime: weddingItem.resepsiTime,
    resepsiLocation: weddingItem.resepsiLocation,
    resepsiGoogleMapLink: weddingItem.resepsiGoogleMapLink,
  };

  return (
    <div className="px-5 mx-auto mt-10 space-y-6 w-full">
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-2xl capitalize">Pengaturan Undangan</h1>
        <p className="text-sm text-gray-500">Konfigurasi seluruh data undangan melalui form dibawah</p>
      </div>

      <FormSettings wedding={formattedWedding} />
    </div>
  );
}
