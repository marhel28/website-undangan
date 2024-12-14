'use client';
import { Button } from '../ui/button';
import { DataTables } from '../DataTable/DataTables';
import { ColumnDef } from '@tanstack/react-table';
import DeleteComment from './DeleteComment';
import { Invitation, InvitationGreeting } from '@prisma/client';

export default function Comments({ data }:{data:InvitationGreeting[]}) {
  const constcolumns: ColumnDef<InvitationGreeting>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: 'invitation',
      header: 'Nama pengirim ',
      cell: ({ row }) => {
        const data: Invitation = row.getValue('invitation');
        return <div className="capitalize min-w-48">{data.name}</div>;
      },
    },
    {
      accessorKey: 'greeting',
      header: 'Ucapan',
      cell: ({ row }) => <div className="capitalize min-w-80">{row.getValue('greeting')}</div>,
    },
    {
      accessorKey: 'id',
      header: 'Action',
      cell: ({ row }) => <DeleteComment id={row.getValue('id')} />,
    },
  ];

  return (
    <>
      <div>
        <div className="w-full">
          <DataTables placeholderSearch1="Cari nama..." labelTable={`Daftar ucapan`} idColumnSearch1="name" data={data as InvitationGreeting[]} columns={constcolumns} />
        </div>
      </div>
    </>
  );
}
