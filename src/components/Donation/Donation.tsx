'use client';
import { ScrollText, SendHorizontal, Banknote } from 'lucide-react';
import { Button } from '../ui/button';
import { DataTables } from '../DataTable/DataTables';
import { ColumnDef } from '@tanstack/react-table';
import AddInvitation from './AddBank';
import FormatRupiah from '../elements/FormatRupiah';
import type { Bank, Donation, Invitation } from '@prisma/client';

export default function Donation({data}:{data:Donation[]}) {
 
  const constcolumns: ColumnDef<Donation>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: 'invitation',
      header: 'Nama pengirim ',
      cell: ({ row }) =>{
        const invitation:Invitation = row.getValue('invitation')
        return <div className="capitalize min-w-48">{invitation.name}</div>;
      },
    },
    {
      accessorKey: 'bank',
      header: 'Bank ',
      cell: ({ row }) =>{
        const bank:Bank = row.getValue('bank')
        return <div className="capitalize min-w-48">{bank.name}</div>;
      },
    },
    {
      accessorKey: 'nominal',
      header: 'Nominal ',
      cell: ({ row }) => <div className="capitalize pr-6">{FormatRupiah(row.getValue('nominal'))}</div>,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-x-5">
        <article className="rounded-lg border border-gray-100 bg-white p-6 shadow ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sumbangan</p>

              <p className="text-lg font-semibold text-gray-900">{FormatRupiah(data.reduce((sum, item) => sum + item.nominal, 0))}</p>
            </div>

            <span className="rounded-full bg-green-100 p-3 text-green-600">
              <Banknote />
            </span>
          </div>
        </article>
      </div>

      <div>
        <div className="w-full">
          <DataTables placeholderSearch1="Cari Nama..." labelTable={`Daftar sumbangan`} idColumnSearch1="name" data={data as Donation[]} columns={constcolumns} />
        </div>
      </div>
    </>
  );
}
