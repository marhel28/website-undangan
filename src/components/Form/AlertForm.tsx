export default function AlertForm({ message }: { message: string }) {
  return <div className="!my-0 text-sm bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-md p-2  text-red-500">{message}</div>;
}
