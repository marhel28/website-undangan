import "./globals.css";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex space-x-2 justify-center items-center bg-transparent h-screen">
      <div className="h-3 w-3 bg-[var(--primary-color)] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-[var(--primary-color)] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-[var(--primary-color)] rounded-full animate-bounce"></div>
    </div>
  );
}
