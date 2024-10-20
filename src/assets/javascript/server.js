//This file will initialize the server, connect to MongoDB, and define routes for login and registration
// Include it and extract some methods for convenience
const server = require('server');
const { get, post } = server.router;

// Launch server with options and a couple of routes
server({ port: 5173 }, [
  get('./Login.jsx', ctx => 'Hello world'),
  post('./Login.jsx', ctx => {
    console.log(ctx.data);
    return 'ok';
  })
]);