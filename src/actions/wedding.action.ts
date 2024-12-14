'use server';

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod';
import { z } from 'zod';

export async function getWeding() {
  try {
    const wedding = await prisma.wedding.findMany()
    return { wedding }
  } catch (error) {
    return { error: 'Failed to fetch wedding' }
  }
}

export async function updateWedding(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
    groomName: z.string().min(1, "Nama mempelai (Pria) tidak boleh kosong"),
    groomMotherName: z.string().min(1, "Nama Ibu mempelai (Pria) tidak boleh kosong"),
    groomFatherName: z.string().min(1, "Nama Bapak mempelai (Pria) tidak boleh kosong"),
    groomAddress: z.string().min(1, "Alamat mempelai (Pria) tidak boleh kosong"),
    brideName: z.string().min(1, "Nama mempelai (Wanita) tidak boleh kosong"),
    brideMotherName: z.string().min(1, "Nama Ibu mempelai (Wanita) tidak boleh kosong"),
    brideFatherName: z.string().min(1, "Nama Bapak mempelai (Wanita) tidak boleh kosong"),
    brideAddress: z.string().min(1, "Alamat mempelai (Wanita) tidak boleh kosong"),
    akadDate: z.date().refine(date => date instanceof Date && !isNaN(date.getTime()), {
        message: "Tanggal (Akad) tidak valid",
    }),
    akadTime: z.string().min(1, "Jam (Akad) tidak boleh kosong"),
    akadLocation: z.string().min(1, "Alamat (Akad) tidak boleh kosong"),
    akadGoogleMapLink: z.string().url("Link Google Map (Akad) tidak valid"),
    resepsiDate: z.date().refine(date => date instanceof Date && !isNaN(date.getTime()), {
        message: "Tanggal (Resepsi) tidak valid",
    }),
    resepsiTime: z.string().min(1, "Jam (Resepsi) tidak boleh kosong"),
    resepsiLocation: z.string().min(1, "Alamat (Resepsi) tidak boleh kosong"),
    resepsiGoogleMapLink: z.string().url("Link Google Map (Resepsi) tidak valid"),
});


    // get data form and check with zod
 // get data form and check with zod
const parse = schema.parse({
  groomName: formData.get('groomName'),
  groomMotherName: formData.get('groomMotherName'),
  groomFatherName: formData.get('groomFatherName'),
  groomAddress: formData.get('groomAddress'),
  brideName: formData.get('brideName'),
  brideMotherName: formData.get('brideMotherName'),
  brideFatherName: formData.get('brideFatherName'),
  brideAddress: formData.get('brideAddress'),
  akadDate: new Date(formData.get('akadDate') as string), // Ensure to convert to Date
  akadTime: formData.get('akadTime'),
  akadLocation: formData.get('akadLocation'),
  akadGoogleMapLink: formData.get('akadGoogleMapLink'),
  resepsiDate: new Date(formData.get('resepsiDate') as string), // Ensure to convert to Date
  resepsiTime: formData.get('resepsiTime'),
  resepsiLocation: formData.get('resepsiLocation'),
  resepsiGoogleMapLink: formData.get('resepsiGoogleMapLink'),
});

// Create the dataForm object with all the validated fields
const dataForm = {
  groomName: parse.groomName,
  groomMotherName: parse.groomMotherName,
  groomFatherName: parse.groomFatherName,
  groomAddress: parse.groomAddress,
  brideName: parse.brideName,
  brideMotherName: parse.brideMotherName,
  brideFatherName: parse.brideFatherName,
  brideAddress: parse.brideAddress,
  akadDate: parse.akadDate,
  akadTime: parse.akadTime,
  akadLocation: parse.akadLocation,
  akadGoogleMapLink: parse.akadGoogleMapLink,
  resepsiDate: parse.resepsiDate,
  resepsiTime: parse.resepsiTime,
  resepsiLocation: parse.resepsiLocation,
  resepsiGoogleMapLink: parse.resepsiGoogleMapLink,
};

    // prisma

    const wedding = await prisma.wedding.update({
      where: { id:1 },
      data: dataForm
    })

    revalidatePath('/settings')
    revalidatePath('/')
     revalidatePath('/invited/[url]', 'layout');
     return { success: true  };

  } catch (e) {
    // Zod Error
    const error = e as ZodError;

    if (error instanceof ZodError) {
      return error.format();
    }

       return { error: 'Failed to process data' }
  }

}
