'use server';

import { RupiahToNumber } from '@/components/elements/FormatRupiah';
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import { z } from 'zod';

export async function getDonation() {
  try {
    const donation = await prisma.donation.findMany({
        orderBy: [
    {
      id: 'desc',
    },
    
  ],
   include: {
    bank:true,
    invitation:true
  },
    })
    return { donation }
  } catch (errorDonation) {
    return { errorDonation: 'Failed to fetch donation' }
  }
}


export async function createDonation(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      nominal: z.string().min(1, "Nominal donation tidak boleh kosong"),
      bankId: z.string().min(1, "id tidak boleh kosong"),
      invitationId: z.string().min(1, "id tidak boleh kosong"),
    });

    // Validasi data dengan Zod
    const parse = schema.parse({
      nominal: formData.get('nominal'),
      bankId: formData.get('bankId'),
      invitationId: formData.get('invitationId'),
    });


    // Data yang akan dikirim ke database
    const dataForm = {
      nominal: RupiahToNumber(parse.nominal as string),
      bankId: parseInt(parse.bankId),
      invitationId: parseInt(parse.invitationId),
    };

    // Prisma
    const donation = await prisma.donation.create({
      data: dataForm,
    });

    revalidatePath('/donation')
    return { success: true, bankId:parse.bankId };
  } catch (e) {
    // Menangani error
    if (e instanceof ZodError) {
      return e.format();
    }

    return { error: 'Failed to process data' };
  }
}

