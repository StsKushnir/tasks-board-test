import { useDragHandlers } from "@/hooks/useDragHandlers";
import { TaskTableProps } from "@/types/interfaces";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import TableHeader from "./TableHeader";
import UserCell from "./UserCell";
import TaskCell from "./TaskCell";

const TaskTable: FC<TaskTableProps> = ({
  users,
  tasks,
  days,
  addTask,
  handleContextMenu,
  updateTaskPosition,
}) => {
  const { onDragStart, onDrop } = useDragHandlers(updateTaskPosition);

  return (
    <table className="table-fixed border-collapse w-full">
      <TableHeader days={days} />
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <UserCell
              name={user.name}
              surname={user.surname}
              position={user.position}
            />
            {days.map((day) => {
              const userTasksForDay = Object.values(tasks).filter(
                (task) => task.userId === user.id && task.day === day
              );

              return (
                <TaskCell
                  key={uuidv4()}
                  tasks={userTasksForDay}
                  userId={user.id}
                  day={day}
                  onDragStart={onDragStart}
                  onDrop={onDrop}
                  handleContextMenu={handleContextMenu}
                  addTask={addTask}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
