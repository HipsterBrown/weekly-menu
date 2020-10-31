import { startOfWeek } from "date-fns";
import { useState } from "react";
import { useLocation } from "react-router";
import qs from "query-string";

export const getMenuDateFor = (date: Date = new Date()) =>
  startOfWeek(date.getTime(), { weekStartsOn: 1 });

export const useQueryParams = <Params = {}>() => {
  const location = useLocation();
  // @ts-ignore
  return useState(() =>
    qs.parse(location.search, { parseBooleans: true, parseNumbers: true })
  )[0] as Partial<Params>;
};
