
import { Task } from "@/types/interfaces";
import { FC } from "react";

interface TaskTableProps {
  users: { id: number; name: string; surname: string; position: string }[];
  tasks: Record<string, Task[]>;
  days: string[];
  addTask: (userId: number, day: string) => void;
  handleContextMenu: (
    e: React.MouseEvent,
    taskId: number,
    userId: number,
    day: string
  ) => void;
}

const TaskTable: FC<TaskTableProps> = ({
  users,
  tasks,
  days,
  addTask,
  handleContextMenu,
}) => {
  return (
    <table className="table-fixed border-collapse w-full">
      <thead>
        <tr>
          <th className="w-32 border p-2 bg-gray-100">Users</th>
          {days.map((day) => (
            <th key={day} className="w-32 border p-2 bg-gray-100">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border p-2 bg-gray-50">
              <div className="flex flex-row gap-1 justify-center">
                <h3>{user.name}</h3>
                <p>{user.surname}</p>
              </div>
              <p className="font-bold text-center mt-2">{user.position}</p>
            </td>
            {days.map((day) => (
              <td key={`${user.id}-${day}`} className="border p-2 h-24 relative">
                <div className="flex flex-col space-y-2">
                  
                  {(tasks[`${user.id}-${day}`] || []).map((task) => (
                    <div
                      key={task.id}
                      className="bg-blue-100 p-2 rounded shadow-md text-sm"
                      onContextMenu={(e) =>
                        handleContextMenu(e, task.id, user.id, day)
                      }
                    >
                      <p className="font-semibold">{task.title}</p>
                      <p className="text-gray-600">{task.description}</p>
                      <p className="text-green-600">${task.price}</p>
                      <p className="text-gray-500 text-xs">
                        Due: {task.deadline}
                      </p>
                      <p className="text-black-500">Status:{' '}{task.status}</p>
                    </div>
                  ))}

                  <button
                    onClick={() => addTask(user.id, day)}
                    className="text-blue-500 underline text-xs"
                  >
                    + Add Task
                  </button>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
