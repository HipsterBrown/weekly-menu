const path = require("path");
const server = require("fastify")({ logger: true });
const proxy = require("fastify-http-proxy");
const static = require("fastify-static");

server.register(proxy, {
  upstream: process.env.COUCHDB_URL,
  prefix: "/db",
  http2: false
});

// server.register(proxy, {
//   upstream: process.env.COUCHDB_URL,
//   prefix: "/_session",
//   http2: false
// });

server.register(static, {
  root: path.join(__dirname, "public")
});

server.get("/display-mode", (_req, reply) => reply.sendFile("index.html"));
server.get("/edit", (_req, reply) => reply.sendFile("index.html"));
server.get("/login", (_req, reply) => reply.sendFile("index.html"));

server.listen(process.env.PORT || 3000);
