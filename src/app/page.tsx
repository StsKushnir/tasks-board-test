import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 font-[family-name:var(--font-geist-sans)] bg-[#5D8AA8]">
      <main className="flex flex-col items-center justify-center p-4 bg-[#F0F8FF] w-full flex-grow">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 my-5 uppercase tracking-wide">
          Welcome Here!
        </h1>
        <div className="flex flex-row gap-4 mt-4">
          <Link
            href={`/account`}
            className="w-[400px] py-1 bg-[#FF7E00] rounded-md hover:bg-[#eca55e] focus:outline-none focus:ring-2 focus:ring-[#eca55e]"
          >
            <p className="text-2xl font-semibold text-center text-gray-700 my-4">
              Account management
            </p>
          </Link>
          <Link
            href={`/board`}
            className="w-[400px] py-1 bg-[#FBCEB1] rounded-md hover:bg-[#fc9066] focus:outline-none focus:ring-2 focus:ring-[#fc9066]"
          >
            <p className="text-2xl font-semibold text-center text-gray-700 my-4">
              Tasks board
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
