'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QRCode from 'react-qr-code';
import { Button } from '../ui/button';
import { DataTables } from '../DataTable/DataTables';
import { ColumnDef } from '@tanstack/react-table';
import AddInvitation from './AddInvitation';
import DeleteInvitation from './DeleteInvitation';
import { Invitation } from '@prisma/client';

export default function GuestBook({ invitation }: { invitation: Invitation[] | [] }) {

  const constcolumns: ColumnDef<Invitation>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => <div className="capitalize min-w-48">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'presence',
      header: 'Keterangan ',
      cell: ({ row }) => <div className="capitalize min-w-32">{row.getValue('presence') !== 1 ? '-' : 'Hadir'}</div>,
    },
    {
      accessorKey: 'code',
      header: 'Link',
      cell: ({ row }) => (
        <div className="min-w-72">
          <a className="text-green-500 underline" target="_blank" href={`${process.env.NEXT_PUBLIC_BASE_URL}/welcome/${row.getValue('code')}`}>{`${process.env.NEXT_PUBLIC_BASE_URL}/welcome/${row.getValue('code')}`}</a>
        </div>
      ),
    },
    {
      accessorKey: 'id',
      header: 'Action',
      cell: ({ row }) => <DeleteInvitation id={row.getValue('id')} />,
    },
  ];

  return (
    <Tabs defaultValue="guest-book" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="guest-book">Buku Tamu</TabsTrigger>
        <TabsTrigger value="Scane QR">Scane QR</TabsTrigger>
      </TabsList>
      <TabsContent value="guest-book" className="space-y-6">
        <>
          <div className="grid grid-cols-2 gap-x-5">
            <article className="rounded-lg border border-gray-100 bg-white p-6 shadow ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Undangan</p>

                  <p className="text-lg font-semibold text-gray-900">{invitation.length}</p>
                </div>

                {/* <span className="rounded-full bg-gray-100 p-3 text-gray-600">
              <ScrollText />
            </span> */}
              </div>
            </article>

            <article className="rounded-lg border border-gray-100 bg-white p-6 shadow ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Hadir</p>

                  <p className="text-lg font-semibold text-gray-900">{invitation.filter((data) => data.presence !== 0).length}</p>
                </div>

                {/* <span className="rounded-full bg-green-100 p-3 text-green-600">
              <UsersRound />
            </span> */}
              </div>
            </article>
          </div>

          <div>
            <div className="flex justify-end mb-5">
              <AddInvitation />
            </div>
            <div className="w-full">
              <DataTables placeholderSearch1="Cari Nama Nama..." labelTable={`Daftar tamu undangan`} idColumnSearch1="name" data={invitation as Invitation[]} columns={constcolumns} />
            </div>
          </div>
        </>
      </TabsContent>
      <TabsContent value="Scane QR">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-2xl capitalize text-center mb-6 mt-10">Scan QR Kehadiran</h3>
        </div>
        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 250, width: '100%' }}>
          <QRCode size={256} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={process.env.NEXT_PUBLIC_QR_CODE as string} viewBox={`0 0 256 256`} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
