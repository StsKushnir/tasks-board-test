import { useState } from "react";
import { useUserStore } from "@/stores/userStore";

export const useUsers = () => {
  const { users, addUser, deleteUser, updateUser } = useUserStore();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const handleAddUser = () => {
    if (!name || !surname || !position) {
      alert("Please fill in all fields.");
      return;
    }

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

  return {
    users,
    name,
    surname,
    position,
    editingUserId,
    deleteUser,
    setName,
    setSurname,
    setPosition,
    handleAddUser,
    handleEditUser,
    handleSaveEditedUser,
  };
};
