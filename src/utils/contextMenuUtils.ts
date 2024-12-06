export function handleContextMenuAction(
  action: string,
  contextMenu: { taskId?: number; userId?: number; day?: string },
  openEditModal: (taskId: number, userId: number, day: string) => void,
  deleteSelectedTask: () => void
) {
  if (action === "edit") {
    openEditModal(contextMenu.taskId!, contextMenu.userId!, contextMenu.day!);
  } else if (action === "delete") {
    deleteSelectedTask();
  }
}
