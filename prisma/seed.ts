import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

  // seed account
  const password = await hash('password123', 12);

  const superadmin = await prisma.user.upsert({
    where: { email: 'superadmin@admin.com' },
    update: {},
    create: {
      email: 'superadmin@admin.com',
      name: 'Super Admin',
      password,
      role: "SUPERADMIN" as const, // Use string matching the enum value
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password,
      role: "ADMIN", // Use string matching the enum value
    },
  });

  // seed wedding
const weddingId = 1; // Replace with the actual id of the wedding entry you want to update

const wedding = await prisma.wedding.upsert({
  where: { id: weddingId }, // Use the id of the wedding entry
  update: {
    groomName: 'Halim Al Anshori',
    groomMotherName: 'Sulastri',
    groomFatherName: 'Buchtiar',
    groomAddress: 'Sungai Bahar, Muaro Jambi, Jambi',
    brideName: 'Nisa Rahma Widia',
    brideMotherName: 'Ngatijah',
    brideFatherName: 'Sutejo',
    brideAddress: 'Kalibeber, Mojotengah, Wonosobo',
    akadDate: new Date('2023-10-01'), // Replace with the actual date
    akadTime: '10:00', // Replace with the actual time
    akadLocation: 'GOR Drs. H. Poedjihardjo',
    akadGoogleMapLink: 'https://maps.app.goo.gl/KiL4vkLurtsoWqBy6',
    resepsiDate: new Date('2023-10-01'), // Replace with the actual date
    resepsiTime: '12:00', // Replace with the actual time
    resepsiLocation: 'GOR Drs. H. Poedjihardjo',
    resepsiGoogleMapLink: 'https://maps.app.goo.gl/KiL4vkLurtsoWqBy6',
 },
  create: {
    groomName: 'Halim Al Anshori',
    groomMotherName: 'Sulastri',
    groomFatherName: 'Buchtiar',
    groomAddress: 'Sungai Bahar, Muaro Jambi, Jambi',
    brideName: 'Nisa Rahma Widia',
    brideMotherName: 'Ngatijah',
    brideFatherName: 'Sutejo',
    brideAddress: 'Kalibeber, Mojotengah, Wonosobo',
    akadDate: new Date('2023-10-01'), // Replace with the actual date
    akadTime: '10:00', // Replace with the actual time
    akadLocation: 'GOR Drs. H. Poedjihardjo',
    akadGoogleMapLink: 'https://maps.app.goo.gl/KiL4vkLurtsoWqBy6',
    resepsiDate: new Date('2023-10-01'), // Replace with the actual date
    resepsiTime: '12:00', // Replace with the actual time
    resepsiLocation: 'GOR Drs. H. Poedjihardjo',
    resepsiGoogleMapLink: 'https://maps.app.goo.gl/KiL4vkLurtsoWqBy6',
  },
});

  // console.log({ superadmin, admin, wedding });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
