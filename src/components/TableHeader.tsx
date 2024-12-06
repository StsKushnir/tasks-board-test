import Link from "next/link";
import { FC } from "react";

interface TableHeaderProps {
  days: string[];
}

const TableHeader: FC<TableHeaderProps> = ({ days }) => (
  <thead>
    <tr>
      <th className="w-32 border p-2 bg-black">
        <Link
          href={`/account`}
          className="w-[200px] py-1 bg-[#FF7E00] transition-all duration-300 ease-in-out hover:bg-[#FFA500] hover:scale-105"
        >
          <p className="text-center text-yellow-50 hover:text-yellow-300 transition-all duration-300 ease-in-out">
            Add new users
          </p>
        </Link>
      </th>

      {days.map((day) => (
        <th key={day} className="w-32 border p-2 bg-gray-100">
          {day}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
