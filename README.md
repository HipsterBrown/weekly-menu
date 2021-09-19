# Weekly Menu

Static single page application to display and plan for weekly meals with offline storage and syncing.

Built with:

- [PouchDB](https://pouchdb.com/)
- [CouchDB](https://couchdb.apache.org/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Formik](https://formik.org/)
- [date-fns](https://date-fns.org/)
- [Parcel](https://parceljs.org/)

Hosted on my internal platform using [Dokku](http://dokku.viewdocs.io/dokku/).

## Architecture

This project was motivated by wanting to experiment with ["jamstack"](https://jamstack.org/) style using self-hosted services. React and the associated libraries (React Router, Chakra UI, and Formik) were used because I'm very familiar with them and can build fairly quickly. The only area of experimentation on the view layer was with newer [Suspense for Data Fetching](https://reactjs.org/docs/concurrent-mode-suspense.html) patterns. PouchDB and CouchDB was the main focus for this project, as the core data layer with offline storage, syncing, and authentication support. Parcel is used as the dev server and bundler to avoid mucking around with configuration and just get straight to building.

## Development

Install dependencies:

```
npm install
```

Set up CouchDB in one of the follow ways:

- follow the installation instructions in [CouchDB docs](https://docs.couchdb.org/en/stable/install/index.html)
- use the `Vagrantfile` to spin up a local instance running in virtual machine with `vagrant up` (see [Vagrant docs](https://www.vagrantup.com/))
- use Docker with the following command:

```
docker run -d --name weekly-menu-db -p 5984:5984 apache/couchdb:2.3.1
```

Then go to http://localhost:5984/\_utils#setup to complete the setup process.

Set environment variable for CouchDB instance in `.env` file:

```
COUCHDB_URL=http://localhost:5984
```

Run the Parcel dev server:

```
npm start
```

## Deployment

Set your production `COUCHDB_URL` in `.env.production`.

Build the public assets:

```
NODE_ENV=production npm run build:public
```

Push to any static site server.

## LICENSE

[GNU AGPLv3 ](LICENSE)
