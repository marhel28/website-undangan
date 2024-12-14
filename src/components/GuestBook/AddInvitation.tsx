'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Banknote, SendHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputForm from '../Form/InputForm';
import ButtonForm from '../Form/ButtonForm';
import { useFormState } from 'react-dom';
import { createInvitation } from '@/actions/invitation.action';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

export default function AddInvitation() {
     const [dialogOpen, setDialogOpen] = React.useState(false);
   const [errorMessage, formAction] = useFormState(createInvitation, undefined);

   React.useEffect(() => {
     // jika berhasil berikan notif
     if (errorMessage && 'success' in errorMessage && errorMessage.success === true) {
       toast('Data berhasil disimpan.', {
         icon: '✔️',
       });
       setDialogOpen(false);
const invitationText = `_Assalamualaikum Warahmatullahi Wabarakatuh_

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara kami.

untuk info lengkap dari acara bisa kunjungi:

${process.env.NEXT_PUBLIC_BASE_URL}/welcome/${errorMessage.codeUrl}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

*Mohon maaf perihal undangan hanya dibagikan melalui pesan ini.*

Terima kasih banyak atas perhatiannya.

_Wassalamualaikum Warahmatullahi Wabarakatuh_`;

       const encodedText = encodeURIComponent(invitationText);
       redirect(`https://api.whatsapp.com/send/?text=${encodedText}`);
     }
   }, [errorMessage, toast]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600">
          Kirim undangan <SendHorizontal />
        </Button>
      </DialogTrigger>
      <DialogContent className="py-12 lg:py-8 max-h-screen overflow-y-auto">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="text-center lg:text-left ">Kirim Undangan</DialogTitle>
            <DialogDescription className=" space-y-2  ">
              <p className="pb-2 max-w-sm">Silahkan inputkan data yang sesuai di bawah ini untuk menambahkan data.</p>
              <div className="text-left !mt-2  grid grid-cols-12 gap-4 ">
                {/* <input type="text" name="token" hidden readOnly defaultValue={tokenUser} value={tokenUser} /> */}
                <div className="col-span-full xl:col-span-12">
                  <InputForm errors={errorMessage} type={'text'} id="name" label="Nama Penerima" />
                </div>
                {/* <div className="col-span-full xl:col-span-6">
                  <InputForm errors={undefined} id="nominal" label="Nominal " value={'hallo'} />
                </div> */}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row items-center !space-y-0 justify-end space-x-4 pt-8">
            <ButtonForm type="submit" className={`m-0 w-full lg:w-fit lg:!px-5 bg-[var(--primary-color)]`} label={'Kirim Undangan'} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
