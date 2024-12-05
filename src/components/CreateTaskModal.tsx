
interface TaskFormProps {
  taskForm: {
    title: string;
    description: string;
    price: string;
    deadline: string;
  };
  
  setTaskForm: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    price: string;
    deadline: string;
  }>>;
  saveTask: () => void;
  closeModal: () => void;
}

export default function CreateTaskModal({
  taskForm,
  setTaskForm,
  saveTask,
  closeModal,
}: TaskFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTaskForm((prev) => ({
      ...prev,
      price: value,
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-md w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">Task Details</h2>
        <form>
          <div className="mb-4">
            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              value={taskForm.title}
              onChange={handleInputChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label className="block">Description</label>
            <input
              type="text"
              name="description"
              value={taskForm.description}
              onChange={handleInputChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label className="block">Price</label>
            <input
              type="text"
              name="price"
              value={taskForm.price}
              onChange={handlePriceChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label className="block">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={taskForm.deadline}
              onChange={handleInputChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={saveTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
