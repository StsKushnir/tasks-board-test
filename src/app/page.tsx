import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 font-[family-name:var(--font-geist-sans)] bg-[#5D8AA8]">
      <main className="flex flex-col items-center p-4 bg-[#F0F8FF] w-full flex-grow">
        <p>Welcome Here!</p>
        <div className="flex flex-col gap-4 mt-4">
          <Link href={`/account`} className="w-[200px] py-1 bg-[#FF7E00]">
            <p className="text-center">Account management</p>
          </Link>
          <Link href={`/board`} className="w-[200px] py-1 bg-[#FBCEB1]">
            <p className="text-center">Tasks board</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
