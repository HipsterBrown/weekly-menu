import PouchDB from "pouchdb";
import PouchDBAuth from "pouchdb-authentication";
import { useCallback, useState, useEffect } from "react";
import { SessionError } from "../components/SessionErrorBoundary";

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
  .on("error", console.log.bind(console, "Sync error:"));

export type MenuResource = {
  read(): PouchDB.Core.ExistingDocument<Menu>;
};

export const useQueryDB = (id: string) => {
  let status: "pending" | "error" | "success" = "pending";
  let result: PouchDB.Core.ExistingDocument<Menu> | Error | null = null;
  const promise = remote
    .getSession()
    .then(response => {
      if (response.userCtx.name === null) throw new SessionError();
      return local.get(id);
    })
    .then(response => {
      status = "success";
      result = response;
    })
    .catch(error => {
      status = "error";
      result = error;
    });
  const read = (): PouchDB.Core.ExistingDocument<Menu> => {
    switch (status) {
      case "pending":
        throw promise;
      case "error":
        throw result;
      case "success": {
        if (!(result instanceof Error) && result?._id) return result;
      }
    }
  };
  return { read };
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
