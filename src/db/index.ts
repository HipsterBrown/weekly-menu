import PouchDB from "pouchdb";
import PouchDBAuth from "pouchdb-authentication";
import { useCallback, useState, useEffect } from "react";

PouchDB.plugin(PouchDBAuth);

export type Day = "M" | "T" | "W" | "Th" | "F" | "Sa" | "Su";

export type Menu = Record<Day, string>;

export const remote = new PouchDB<PouchDB.Core.Document<Menu>>(
  `${process.env.COUCHDB_URL}/menus`,
  {
    skip_setup: true
  }
);

export const local = new PouchDB<PouchDB.Core.Document<Menu>>("menus");

local
  .sync(remote, { live: true, retry: true })
  .on("error", console.log.bind(console));

export const useQueryDB = (id: string) => {
  const [doc, setDoc] = useState<PouchDB.Core.ExistingDocument<Menu> | null>(
    null
  );
  useEffect(() => {
    local.get(id).then(setDoc);
  }, [setDoc]);

  useEffect(() => {
    const listener = local.changes({
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

export const useSession = () => {
  const [
    session,
    setSession
  ] = useState<PouchDB.Authentication.UserContext | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        setLoading(true);
        const { name, roles } = await remote.logIn(username, password, {
          // @ts-ignore
          ajax: {
            headers: {
              Authorization: `Basic ${btoa(username + ":" + password)}`
            }
          }
        });
        setSession({ name, roles });
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    },
    [remote]
  );

  useEffect(() => {
    remote
      .getSession()
      .then(response => {
        setSession(response.userCtx);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, login, session };
};

export const DAYS: Day[] = ["M", "T", "W", "Th", "F", "Sa", "Su"];
