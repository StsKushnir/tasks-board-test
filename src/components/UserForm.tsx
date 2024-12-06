import { FC } from "react";

interface UserFormProps {
  name: string;
  surname: string;
  position: string;
  editingUserId: number | null;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  handleAddUser: () => void;
  handleSaveEditedUser: () => void;
}

const UserForm: FC<UserFormProps> = ({
  name,
  surname,
  position,
  editingUserId,
  setName,
  setSurname,
  setPosition,
  handleAddUser,
  handleSaveEditedUser,
}) => {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={editingUserId ? handleSaveEditedUser : handleAddUser}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {editingUserId ? "Save Changes" : "Add User"}
      </button>
    </div>
  );
};

export default UserForm;
