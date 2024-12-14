'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Banknote, Landmark } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputForm from '../Form/InputForm';
import ButtonForm from '../Form/ButtonForm';
import { useFormState } from 'react-dom';
import { createBank } from '@/actions/bank.action';
import toast from 'react-hot-toast';

export default function AddBank() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [errorMessage, formAction] = useFormState(createBank, undefined);

  React.useEffect(() => {
    // jika berhasil berikan notif
    if (errorMessage && 'success' in errorMessage && errorMessage.success === true) {
      toast('Data berhasil disimpan.', {
        icon: '✔️',
      });
      setDialogOpen(false);
    }
  }, [errorMessage, toast]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[var(--primary-color)]">
          Tambah bank <Landmark />
        </Button>
      </DialogTrigger>
      <DialogContent className="py-12 lg:py-8 max-h-screen overflow-y-auto">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="text-center lg:text-left ">Tambah bank</DialogTitle>
            <DialogDescription className=" space-y-2  ">
              <p className="pb-2 max-w-sm">Silahkan inputkan data yang sesuai di bawah ini untuk menambahkan data.</p>
              <div className="text-left !mt-2  grid grid-cols-12 gap-4 ">
                {/* <input type="text" name="token" hidden readOnly defaultValue={tokenUser} value={tokenUser} /> */}
                <div className="col-span-full xl:col-span-12">
                  <InputForm errors={undefined} type={'text'} id="name" label="Nama Bank" />
                </div>
                <div className="col-span-full xl:col-span-12">
                  <InputForm errors={undefined} type={'text'} id="recipient" label="Nama Penerima" />
                </div>
                <div className="col-span-full xl:col-span-12">
                  <InputForm errors={undefined} type={'text'} id="accountNumber" label="Nomor Rekening" />
                </div>
                {/* <div className="col-span-full xl:col-span-6">
                  <InputForm errors={undefined} id="nominal" label="Nominal " value={'hallo'} />
                </div> */}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row items-center !space-y-0 justify-end space-x-4 pt-8">
            <ButtonForm type="submit" className={`m-0 w-full lg:w-fit lg:!px-5 bg-[var(--primary-color)]`} label={'Tambah bank'} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
