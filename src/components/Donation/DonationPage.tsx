'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QRCode from 'react-qr-code';
import Donation from '@/components/Donation/Donation';
import ListBank from '@/components/Donation/ListBank';
import { Bank } from '@prisma/client';
import type { Donation as TDonation } from '@prisma/client';

export default function DonationPage({ bank, donation }: { bank: Bank[]; donation: TDonation[] }) {
  return (
    <Tabs defaultValue="donation" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="donation">Sumbangan</TabsTrigger>
        <TabsTrigger value="bank">List Bank</TabsTrigger>
      </TabsList>
      <TabsContent value="donation" className="space-y-6">
        <Donation data={donation} />
      </TabsContent>
      <TabsContent value="bank">
        <ListBank bank={bank} />
      </TabsContent>
    </Tabs>
  );
}