'use server';

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod';
import { z } from 'zod';

export async function getBank() {
  try {
    const bank = await prisma.bank.findMany({
        orderBy: [
    {
      id: 'desc',
    },
  ],
    })
    return { bank }
  } catch (errorBank) {
    return { errorBank: 'Failed to fetch bank' }
  }
}

export async function getSpecificBank(id:string) {
  try {
  const bank = await prisma.bank.findUnique({
    where: {
      id: parseInt(id), 
    },
  });
    return { bank }
  } catch (errorBank) {
    return { errorBank: 'Failed to fetch bank' }
  }
}


export async function createBank(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      name: z.string().min(1, "Nama bank tidak boleh kosong"),
      recipient: z.string().min(1, "Nama Penerima tidak boleh kosong"),
      accountNumber: z.string().min(1, "Nomor rekening tidak boleh kosong"),
    });

    // Validasi data dengan Zod
    const parse = schema.parse({
      name: formData.get('name'),
      recipient: formData.get('recipient'),
      accountNumber: formData.get('accountNumber'),
    });


    // Data yang akan dikirim ke database
    const dataForm = {
      name: parse.name,
      recipient: parse.recipient,
      accountNumber: parseInt(parse.accountNumber),
    };

    // Prisma
    const bank = await prisma.bank.create({
      data: dataForm,
    });

    revalidatePath('/donation')
    revalidatePath('/invited/[url]', 'layout');
    return { success: true };
  } catch (e) {
    // Menangani error
    if (e instanceof ZodError) {
      return e.format();
    }

    return { error: 'Failed to process data' };
  }
}


export async function deleteBank(prevState: any, formData: FormData) {
  try {
      const schema = z.object({
      id: z.string().min(1, "id tidak boleh kosong"),
    });

    // Validasi data dengan Zod
    const parse = schema.parse({
      id: formData.get('id'),
    });

    const id =  parseInt(parse.id)
    await prisma.bank.delete({
      where: {id }
    })

    revalidatePath('/donation')
    revalidatePath('/invited/[url]', 'layout')
    return { success: true }
  } catch (e) {
    // Menangani error
    if (e instanceof ZodError) {
      return e.format();
    }

    return { error: 'Failed to process data' };
  }
}