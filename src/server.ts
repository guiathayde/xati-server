import 'reflect-metadata';
import 'dotenv/config';

import { server } from './http';
import './websocket';

server.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});
