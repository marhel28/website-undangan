export default function FormatRupiah(angka: number) {
  if (isNaN(angka)) {
    // Return empty string for NaN input
    return 'Rp 0';
  }

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(angka);
}

export function RupiahToNumber(rupiah: string): number {
  // Menghapus semua karakter selain digit
  const cleanedRupiah = rupiah.replace(/[^\d]/g, '');

  // Mengonversi string menjadi angka
  const number = parseInt(cleanedRupiah);

  return number;
}

export const unformatNumber = (formattedNumber: string): string => {
  // Hapus semua karakter non-digit dari string
  const numericValue = formattedNumber.replace(/\D/g, '');
  // Kembalikan nilai setelah dihapus karakter non-digit
  return numericValue;
};