import PouchDB from "pouchdb";
import PouchDBAuth from "pouchdb-authentication";

const RemotePouch = PouchDB.defaults({
  prefix: process.env.COUCHDB_URL,
});

RemotePouch.plugin(PouchDBAuth);

export type Day = "M" | "T" | "W" | "Th" | "F" | "Sa" | "Su";

export type Menu = Record<Day, string>;

export const remote = new RemotePouch<PouchDB.Core.Document<Menu>>(`menus`, {
  skip_setup: true,
});

export const local = new PouchDB<PouchDB.Core.Document<Menu>>("menus");

local
  .sync(remote, { live: true, retry: true })
  .on("error", console.log.bind(console, "Sync error:"));

export type MenuResource = {
  read(): PouchDB.Core.ExistingDocument<Menu>;
};

export const getSession = async () => {
  const { userCtx } = await remote.getSession();
  if (userCtx.name === null) {
    throw new Response("Must be logged in to continue", { status: 401 });
  }
  return userCtx;
};

export const getMenu = async (id: string) => {
  try {
    return await local.get(id);
  } catch (error) {
    if (error instanceof Error && error.name === "not_found") {
      throw new Response(`Unable to find menu for id: ${id}`, { status: 404 });
    }
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  await remote.logIn(username, password, {
    // @ts-ignore
    ajax: {
      headers: {
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    },
  });
};

export const logout = async () => {
  try {
    await remote.logOut();
  } catch (error) {
    console.warn(error);
  }
};

export const DAYS: Day[] = ["Su", "M", "T", "W", "Th", "F", "Sa"];
