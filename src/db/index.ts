import PouchDB from "pouchdb";
import { useState, useEffect } from "react";

export type Day = "M" | "T" | "W" | "Th" | "F" | "Sa" | "Su";

export type Menu = Record<Day, string>;

export const menus = new PouchDB<PouchDB.Core.Document<Menu>>("menus");

export const useQueryDB = (id: string) => {
  const [doc, setDoc] = useState<PouchDB.Core.ExistingDocument<Menu> | null>(
    null
  );
  const [_, setRefresh] = useState(false);

  useEffect(() => {
    menus.get(id).then(setDoc);
  }, [setDoc]);

  useEffect(() => {
    const listener = menus.changes({ since: "now", live: true });
    listener.on("change", () => setRefresh(state => !state));
    return () => listener.cancel();
  }, []);

  return doc;
};

export const DAYS: Day[] = ["M", "T", "W", "Th", "F", "Sa", "Su"];
