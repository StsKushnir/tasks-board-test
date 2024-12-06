import { FC } from "react";

interface UserCellProps {
  name: string;
  surname: string;
  position: string;
}

const UserCell: FC<UserCellProps> = ({ name, surname, position }) => (
  <td className="border p-2 bg-gray-50">
    <div className="flex flex-row gap-1 justify-center">
      <h3>{name}</h3>
      <p>{surname}</p>
    </div>
    <p className="font-bold text-center mt-2">{position}</p>
  </td>
);

export default UserCell;
