'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Banknote, Landmark } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputForm from '../Form/InputForm';
import ButtonForm from '../Form/ButtonForm';
import Link from 'next/link';
import { Bank } from '@prisma/client';
import { useFormState } from 'react-dom';
import { createDonation } from '@/actions/donation.action';
import toast from 'react-hot-toast';
import useInputRupiah from '@/hooks/useInputRupiah';
import { redirect } from 'next/navigation';


export default function AddDonation({bank, id}:{bank?:Bank[]; id?:number}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [errorMessage, formAction] = useFormState(createDonation, undefined);

  // nominal
  const { nominal: nominal1, handleNominal: handleNominal1 } = useInputRupiah();
  // Function to handle change in nominal inputs
  const handleChange = (value: string) => {
    handleNominal1(value);
  };

  React.useEffect(() => {
    // jika berhasil berikan notif
    if (errorMessage && 'success' in errorMessage && errorMessage.success === true) {
      // Reset nominal and valuePayment to default values
      handleChange('');

      redirect(`/success-payment/${errorMessage.bankId}`)
    }

    console.log(errorMessage);
  }, [errorMessage, toast]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="uppercase mt-4 rounded-full bg-[var(--primary-color)] text-lg font-bold text-white px-8 !py-3 shadow">Kirim Hadiah</Button>
      </DialogTrigger>
      <DialogContent className="py-12 lg:py-8 max-h-screen overflow-y-auto">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="text-center lg:text-left ">Kirim Hadiah</DialogTitle>
            <DialogDescription className=" space-y-2  ">
              <p className="pb-2 max-w-sm">Silahkan inputkan data yang sesuai di bawah ini untuk menambahkan data.</p>
              <div className="text-left !mt-2  grid grid-cols-12 gap-4 ">
                <input type="text" name="invitationId" hidden readOnly defaultValue={id} value={id} />
                <div className="col-span-full xl:col-span-12">
                  <InputForm
                    errors={errorMessage}
                    placeholder="Pilih Bank"
                    id="bankId"
                    label="Bank"
                    className="cursor-pointer"
                    options={
                      bank &&
                      bank?.map((data) => ({
                        label: data.name,
                        value: data.id.toString(),
                      }))
                    }
                  />
                </div>

                <div className="col-span-full xl:col-span-12">
                  <InputForm errors={errorMessage} type={'text'} id="nominal" label="Nominal Transfer" value={nominal1} onChange={handleChange} />
                </div>
                {/* <div className="col-span-full xl:col-span-6">
                  <InputForm errors={errorMessage} id="nominal" label="Nominal " value={'hallo'} />
                </div> */}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row items-center !space-y-0 justify-end space-x-4 pt-8">
            <ButtonForm type="submit" className={`m-0 w-full lg:w-fit lg:!px-5 bg-[var(--primary-color)]`} label={'Kirim Hadiah'} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
