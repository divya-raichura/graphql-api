import { useQuery, gql } from "@apollo/client";

const ALL_USERS = gql`
  query QueryAllUsers {
    users {
      id
      name
      age
      username
    }
    # if we include below query as well, then data obj will be as follows when data is recieved= data: {users : Array, movies: Array} We can access these as data.users.map or data.movies.map functions
    # movies {
    #   id
    #   name
    # }
  }
`;

function DisplayUsers() {
  const { data, loading, error } = useQuery(ALL_USERS);

  if (loading) {
    return <h1>Loading all users...</h1>;
  }

  if (error) {
    return <h1>Error while fetching all users...</h1>;
  }

  return (
    <div>
      {/* {console.log(data)} */}
      {/* {data && (
        <ul>
          {data.users.map((item) => (
            <User key={item.id} {...item} />
          ))}
        </ul>
      )} */}
      <ul>
        {data.users.map((item) => (
          <User key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

function User({ id, name, age, username }) {
  return (
    <li>
      <ul>
        <li>id: {id}</li>
        <li>name: {name}</li>
        <li>age: {age}</li>
        <li>username: {username}</li>
      </ul>
    </li>
  );
}

export default DisplayUsers;
