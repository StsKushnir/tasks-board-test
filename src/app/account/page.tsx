"use client";

import { useUsers } from "@/hooks/useUsers";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";
import Link from "next/link";

export default function UsersManagement() {
  const {
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
  } = useUsers();

  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">
        User Management
      </h1>

      <UserForm
        name={name}
        surname={surname}
        position={position}
        editingUserId={editingUserId}
        setName={setName}
        setSurname={setSurname}
        setPosition={setPosition}
        handleAddUser={handleAddUser}
        handleSaveEditedUser={handleSaveEditedUser}
      />

      <UserList
        users={users}
        deleteUser={deleteUser}
        handleEditUser={handleEditUser}
      />
      <Link
        href={`/board`}
        className=" absolute w-[200px] py-1 bg-[#FBCEB1] mt-10 rounded-md top-[5%] right-[10%] hover:bg-[#e4b08e] focus:outline-none focus:ring-2 focus:ring-[#e4b08e]"
      >
        <p className="text-center text-blue">Go to the board</p>
      </Link>
      <Link
        href={`/`}
        className=" absolute w-[200px] py-1 bg-black mt-10 rounded-md top-[10%] right-[10%] focus:outline-none "
      >
        <p className="text-center text-white hover:text-[#F4C430]">Home</p>
      </Link>
    </div>
  );
}
