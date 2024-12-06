import { FC } from "react";

interface User {
  id: number;
  name: string;
  surname: string;
  position: string;
}

interface UserListProps {
  users: User[];
  deleteUser: (id: number) => void;
  handleEditUser: (id: number) => void;
}

const UserList: FC<UserListProps> = ({ users, deleteUser, handleEditUser }) => {
  return (
    <ul className="mt-8 w-full max-w-sm space-y-4">
      {users.map((user) => (
        <li
          key={user.id}
          className="p-4 bg-white border rounded-md shadow-sm hover:shadow-md transition-all flex justify-between items-center"
        >
          <p className="text-gray-800">
            <strong>
              {user.name} {user.surname}
            </strong>{" "}
            - {user.position}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditUser(user.id)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteUser(user.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
