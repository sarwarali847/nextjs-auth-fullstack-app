import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="text-3xl font-bold text-white mb-">Not Found</div>
      <div className="text-lg text-white mb-8">Could not find the requested resource</div>
      <Link href="/login" className="text-blue-600 underline hover:text-blue-800">Return Home</Link>
    </div>
  );
}
