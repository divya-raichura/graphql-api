import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($somenameArg: String!) {
    # $somenameArg matlab bas args ka name h
    movie(name: $somenameArg) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation createUserQuery($someArgs: CreateUserInput!) {
    # type defined in backend
    # below function name also needs to match, the argument key 'input' also shud match as what is defined in backend
    createUser(input: $someArgs) {
      id
      name
    }
  }
`;

export default function FetchData() {
  return (
    <>
      <MoreUsers />
      <DisplayUsers />
      <InputData />
    </>
  );
}

function MoreUsers() {
  const { refetch } = useQuery(QUERY_ALL_USERS);

  const [user, setUser] = useState({
    name: "",
    username: "",
    age: 0,
    nationality: "",
  });

  const [createUserMethod, { error, loading }] =
    useMutation(CREATE_USER_MUTATION);

  function handleChange(e) {
    const k = e.target.name;
    const v = e.target.value;
    setUser({ ...user, [k]: v });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    // user.age = Number(user.age);
    createUserMethod({
      variables: {
        someArgs: user,
      },
    });

    refetch();
  }

  return (
    <div>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={handleChange}
          name="name"
          value={user.name}
        ></input>
        <input
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={user.username}
        ></input>
        <input
          type="number"
          placeholder="Age"
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: Number(e.target.value) })
          }
          value={user.age}
          name="age"
        ></input>
        <input
          placeholder="Nationality"
          name="nationality"
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value.toUpperCase() })
          }
          value={user.nationality.toUpperCase()}
        ></input>
        <button type="submit">Create User</button>
      </form>
      {loading && <h1>Loading...</h1>}
      {error && (
        <p style={{ color: "red" }}>
          Error :( ... You did not fill all the inputs maybe!
        </p>
      )}
      <br></br>
    </div>
  );
}

function InputData() {
  const [inp, setInp] = useState("");
  const [
    fetchMovie,
    { data: movieData, error: movieError, loading: movieLoading },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);

  function handleClick() {
    fetchMovie({ variables: { somenameArg: inp } });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Interstellar..."
        value={inp}
        onChange={(e) => setInp(e.target.value)}
      />
      <button onClick={handleClick}>Get Movie Details</button>
      {/* {movieData && (
        <div>
          {console.log(movieData)}
          <h3>Movie Name: {movieData.movie.name}</h3>
          <h3>Year of Release: {movieData.movie.yearOfPublication}</h3>
        </div>
      )} */}

      {/* {movieLoading ? (
        <h1>Loading...</h1>
      ) : movieError ? (
        <h1>Error...</h1>
      ) : movieData ? (
        <div>
          {console.log(movieData)}
          <h3>Movie Name: {movieData.movie.name}</h3>
          <h3>Year of Release: {movieData.movie.yearOfPublication}</h3>
        </div>
      ) : (
        <h1>Something went wrong...</h1>
      )} */}

      {movieLoading && <h1>Loading...</h1>}
      {movieError && <h1>Error...</h1>}
      {/* {movieData && (
        <div>
          {console.log(movieData)}
          <h3>Movie Name: {movieData.movie.name}</h3>
          <h3>Year of Release: {movieData.movie.yearOfPublication}</h3>
        </div>
      )} */}

      {/* {movieData?.movie ? (
        <div>
          {console.log(movieData)}
          <h3>Movie Name: {movieData.movie.name}</h3>
          <h3>Year of Release: {movieData.movie.yearOfPublication}</h3>
        </div>
      ) : (
        <>
          <h1>Does Not Exist</h1>
          {console.log("hmm", movieData)}
        </>
      )} */}

      {movieData ? (
        movieData.movie ? (
          <div>
            {console.log(movieData)}
            <h3>Movie Name: {movieData.movie.name}</h3>
            <h3>Year of Release: {movieData.movie.yearOfPublication}</h3>
          </div>
        ) : (
          <h1>Movie Does Not Exists</h1>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

function DisplayUsers() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <div>
        {console.log(error)}
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <>
      {data && (
        <div>
          {data.users.map((user) => {
            const { id, name, age, username, nationality } = user;
            return (
              <div key={id}>
                <h3>Name: {name}</h3>
                <h3>Username: {username}</h3>
                <h3>Nationality: {nationality}</h3>
                <h3>Age: {age}</h3>
                <br></br>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
