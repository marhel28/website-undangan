'use server';

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod';
import { z } from 'zod';

export async function getInvitation() {
  try {
    const invitation = await prisma.invitation.findMany({
        orderBy: [
    {
      id: 'desc',
    },
  ],
    })
    return { invitation }
  } catch (error) {
    return { error: 'Failed to fetch invitation' }
  }
}


export async function createInvitation(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      name: z.string().min(1, "Nama penerima tamu undangan tidak boleh kosong"),
    });

    // Validasi data dengan Zod
    const parse = schema.parse({
      name: formData.get('name'),
    });

    // Fungsi untuk menghasilkan string 4 karakter acak
    const generateRandomString = () => {
      return Math.random().toString(36).substring(2, 6); // Hanya huruf kecil dan angka
    };

    // Membuat slug dari nama
    const slug = parse.name
      .toLowerCase() // Ubah menjadi huruf kecil
      .replace(/\s+/g, '-') // Ganti spasi dengan tanda hubung
      .replace(/[^a-z0-9-]/g, '') // Hapus karakter yang tidak diizinkan
      .replace(/-+/g, '-') // Hapus tanda hubung berulang
      .replace(/-$/, ''); // Hapus tanda hubung di akhir string

    // Gabungkan slug dengan string acak
    const code = `${slug}-${generateRandomString()}`;

    // Data yang akan dikirim ke database
    const dataForm = {
      name: parse.name,
      presence: 0,
      code,
    };

    // Prisma
    const wedding = await prisma.invitation.create({
      data: dataForm,
    });

    revalidatePath('/guest-book');
    revalidatePath('/invited/[url]', 'layout');
    return { success: true, codeUrl: code };
  } catch (e) {
    // Menangani error
    if (e instanceof ZodError) {
      return e.format();
    }

    return { error: 'Failed to process data' };
  }
}

export async function deleteInvitation(prevState: any, formData: FormData) {
  try {
      const schema = z.object({
      id: z.string().min(1, "id tidak boleh kosong"),
    });

    // Validasi data dengan Zod
    const parse = schema.parse({
      id: formData.get('id'),
    });

    const id =  parseInt(parse.id)
    await prisma.invitation.delete({
      where: {id }
    })

    revalidatePath('/guest-book')
     revalidatePath('/invited/[url]', 'layout');
    return { success: true, }
  } catch (e) {
    // Menangani error
    if (e instanceof ZodError) {
      return e.format();
    }

    return { error: 'Failed to process data' };
  }
}