import User from '../models/User.js';
import { signToken } from '../utils/auth.js';
import { AuthenticationError } from 'apollo-server-express';

interface Context {
  user?: { _id: string };
}

interface LoginArgs {
  email: string;
  password: string;
}

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
}

interface SaveBookArgs {
  bookData: any;
}

interface RemoveBookArgs {
  bookId: string;
}

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return User.findById(context.user._id);
    },
  },
  Mutation: {
    login: async (_parent: unknown, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Incorrect credentials');
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect credentials');
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: String(user._id),
      });
      return { token, user };
    },
    addUser: async (_parent: unknown, { username, email, password }: AddUserArgs) => {
      const user = await User.create({ username, email, password });
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: String(user._id),
      });
      return { token, user };
    },
    saveBook: async (_parent: unknown, { bookData }: SaveBookArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );
      return user;
    },
    removeBook: async (_parent: unknown, { bookId }: RemoveBookArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return user;
    },
  },
  User: {
    bookCount: (parent: { savedBooks: any[] }) => parent.savedBooks.length,
  },
};

export default resolvers;
