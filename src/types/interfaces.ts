export interface User {
  id: number;
  name: string;
  surname: string;
  position: string;
}

export interface Task {
  day: string;
  id: number;
  title: string;
  description: string;
  price: number;
  deadline: string;
  status: "Pending" | "In Progress" | "Completed";
}