import { startOfWeek } from "date-fns";
import { useState } from "react";
import { useLocation } from "react-router";
import qs from "query-string";

export const getMenuDateFor = (
  date: Date = new Date(),
  weekStartsOn: Required<Parameters<typeof startOfWeek>>[1]["weekStartsOn"] = 0
) => startOfWeek(date.getTime(), { weekStartsOn });

export const useQueryParams = <Params = {}>() => {
  const location = useLocation();
  // @ts-expect-error
  return useState(() =>
    qs.parse(location.search, { parseBooleans: true, parseNumbers: true })
  )[0] as Partial<Params>;
};
