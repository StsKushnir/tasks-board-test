import { format, addDays } from "date-fns";

export const generateDays = (daysCount: number): string[] => {
  const today = new Date();
  return Array.from({ length: daysCount }, (_, i) =>
    format(addDays(today, i), "yyyy-MM-dd")
  );
};
