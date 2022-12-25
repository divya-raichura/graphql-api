import { UserList, MovieList } from "../data/fakeData.mjs";

export const resolvers = {
  Query: {
    // USER RESOLVERS
    // users : () => UserList
    users() {
      return UserList;
    },
    user: (parent, args) => {
      return UserList.find((user) => user.id === args.id);
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const data = MovieList.find((movie) => movie.name === args.name);
      return data;
    },
  },

  User: {
    // if this was in db then there  was no need to do write resolver
    favoriteMovies: () => {
      return MovieList.filter(
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  // MUTATION RESOLVER
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let updatedUser = null;
      UserList.forEach((user) => {
        if (id === user.id) {
          user.username = newUsername;
          updatedUser = user;
        }
      });
      return updatedUser;
    },

    deleteUser: (parent, args) => {
      const id = args.input.id;
      let deletedUser = null;
      const indexToDelete = UserList.findIndex((user) => user.id === id);
      deletedUser = UserList[indexToDelete];

      if (indexToDelete !== -1) {
        UserList.splice(indexToDelete, 1);
      }

      return deletedUser;
    },
  },
};
