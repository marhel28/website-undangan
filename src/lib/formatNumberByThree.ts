export const formatNumberByThree = (num: number): string => {
  // Konversi angka ke string
  const numStr = num.toString();

  // Gunakan regex untuk memisahkan setiap 3 digit
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, "-");
};