import { startOfWeek } from "date-fns";

export const getMenuDateFor = (
  date: Date = new Date(),
  weekStartsOn: Required<Parameters<typeof startOfWeek>>[1]["weekStartsOn"] = 0
) => startOfWeek(date.getTime(), { weekStartsOn });

export const hasStatus = (error: unknown): error is { status: number } => {
  return typeof error === "object" && error !== null && "status" in error;
};
