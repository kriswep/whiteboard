import server from './app';
import startIo from './socket';

const port = process.env.PORT || 3000;

// start server
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${port}!`);
});

// start socket io handling
startIo(server);
