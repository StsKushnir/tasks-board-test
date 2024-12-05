"use client";

import { useState } from "react";
import { useUserStore } from "@/stores/userStore";

export default function UsersManagement() {
  const { users, addUser, deleteUser, updateUser } = useUserStore();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name,
      surname,
      position,
    };

    addUser(newUser);
    setName("");
    setSurname("");
    setPosition("");
  };

  const handleEditUser = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setName(userToEdit.name);
      setSurname(userToEdit.surname);
      setPosition(userToEdit.position);
      setEditingUserId(id);
    }
  };

  const handleSaveEditedUser = () => {
    if (editingUserId !== null) {
      const updatedUser = {
        id: editingUserId,
        name,
        surname,
        position,
      };

      updateUser(updatedUser);
      setName("");
      setSurname("");
      setPosition("");
      setEditingUserId(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">
        User Management
      </h1>
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
    </div>
  );
}

