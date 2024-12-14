'use server';

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod';
import { z } from 'zod';

export async function getInvitationGreeting() {
  try {
    const invitationGreeting = await prisma.invitationGreeting.findMany({
        orderBy: [
    {
      id: 'desc',
    },
  ],include:{
    invitation:true
  }
    })
    return { invitationGreeting }
  } catch (errorInvitationGreeting) {
    return { errorInvitationGreeting: 'Failed to fetch invitationGreeting' }
  }
}


export async function createInvitationGreeting(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      greeting: z.string().min(1, "Nama invitationGreeting tidak boleh kosong"),
      invitationId: z.string().min(1, "Id tidak boleh kosong"),
    });

    // Validasi data dengan Zod
    const parse = schema.parse({
      greeting: formData.get('greeting'),
      invitationId: formData.get('invitationId'),
    });


    // Data yang akan dikirim ke database
    const dataForm = {
      greeting: parse.greeting,
      invitationId: parseInt(parse.invitationId),
    };

    // Prisma
    const invitationGreeting = await prisma.invitationGreeting.create({
      data: dataForm,
    });

    revalidatePath('/comments')
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


export async function deleteInvitationGreeting(prevState: any, formData: FormData) {
  try {
      const schema = z.object({
      id: z.string().min(1, "id tidak boleh kosong"),
    });

    // Validasi data dengan Zod
    const parse = schema.parse({
      id: formData.get('id'),
    });

    const id =  parseInt(parse.id)
    await prisma.invitationGreeting.delete({
      where: {id }
    })

    revalidatePath('/comments')
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