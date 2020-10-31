import { startOfWeek } from "date-fns";

export const getMenuDateFor = (date: Date = new Date()) =>
  startOfWeek(date.getTime(), { weekStartsOn: 1 });
