'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputForm from '../Form/InputForm';
import ButtonForm from '../Form/ButtonForm';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { deleteBank } from '@/actions/bank.action';

export default function DeleteBank({id}:{id:string}) {
     const [dialogOpen, setDialogOpen] = React.useState(false);
   const [errorMessage, formAction] = useFormState(deleteBank, undefined);

   React.useEffect(() => {
     // jika berhasil berikan notif
     if (errorMessage && 'success' in errorMessage && errorMessage.success === true) {
       toast('Data berhasil dihapus.', {
         icon: '✔️',
       });
       setDialogOpen(false);
     }
   }, [errorMessage, toast]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="text-xs">
          Hapus 
        </Button>
      </DialogTrigger>
      <DialogContent className="py-12 lg:py-8 max-h-screen overflow-y-auto">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="text-center lg:text-left ">Hapus Bank</DialogTitle>
            <DialogDescription className=" space-y-2  ">
              <p className="pb-2 max-w-sm">Anda yakin ingin menghapus data ?</p>
              <div className="text-left !mt-2  grid grid-cols-12 gap-4 ">
                <input type="text" name="id" hidden readOnly defaultValue={id} value={id} />
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row items-center !space-y-0 justify-end space-x-4 pt-8">
            <ButtonForm type="submit" className={`m-0 w-full lg:w-fit lg:!px-5 bg-[var(--primary-color)]`} label={'Hapus Bank'} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
