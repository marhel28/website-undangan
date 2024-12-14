'use server';

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getInvited(url:string) {
  try {
  const invited = await prisma.invitation.findUnique({
    where: {
      code: url, // Ganti dengan kode tertentu
    },
  });

    return { invited }
  } catch (invitedError) {
    return { invitedError: 'Failed to fetch bank' }
  }
}

export async function updateInvited(url:string) {
  try {
  const invited = await prisma.invitation.findUnique({
    where: {
      code: url, // Ganti dengan kode tertentu
    },
  });
  const updateInvited = await prisma.invitation.update({
  where: {
    code: url,
  },
  data: {
    presence: 1,
  },
})

  revalidatePath('/guest-book')
  return { success: true, }

    
  } catch (invitedError) {
    return { invitedError: 'Failed to update' }
  }
}


