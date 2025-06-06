import express, { type Request } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db from './config/connection.js';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas/index.js';
import { getUserFromToken } from './utils/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded', // Prevent unbounded cache warning
    context: ({ req }: { req: Request }) => {
      const user = getUserFromToken(req);
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app: app as any });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../../client/dist')));
    app.get('*', (_req, res: express.Response) => {
      res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`)
    );
  });
})();
