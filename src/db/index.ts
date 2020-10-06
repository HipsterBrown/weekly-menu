import PouchDB from "pouchdb";
import { useState, useEffect } from "react";

export type Day = "M" | "T" | "W" | "Th" | "F" | "Sa" | "Su";

export type Menu = Record<Day, string>;

export const menus = new PouchDB<PouchDB.Core.Document<Menu>>(
  `${process.env.COUCHDB_URL}/menus`
);

export const useQueryDB = (id: string) => {
  const [doc, setDoc] = useState<PouchDB.Core.ExistingDocument<Menu> | null>(
    null
  );
  useEffect(() => {
    menus.get(id).then(setDoc);
  }, [setDoc]);

  useEffect(() => {
    const listener = menus.changes({
      since: "now",
      live: true,
      include_docs: true,
      doc_ids: [id]
    });
    listener.on("change", change => {
      setDoc(change.doc);
    });
    return () => listener.cancel();
  }, []);

  return doc;
};

export const DAYS: Day[] = ["M", "T", "W", "Th", "F", "Sa", "Su"];
