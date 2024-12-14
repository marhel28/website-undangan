export default function formatDate(inputDate: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate: string = new Date(inputDate).toLocaleDateString('id-ID', options);
  return formattedDate;
}
