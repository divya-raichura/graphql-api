import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_USERS } from "./DisplayUsers";

const ADD_USER = gql`
  mutation AddUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      username
      age
      nationality
    }
  }
`;

function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    age: "",
    nationality: "",
  });

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  function handleSubmit(e) {
    e.preventDefault();
    user.nationality = user.nationality.toUpperCase();
    user.age = Number(user.age);
    addUser({ variables: { input: user } });
    setUser({
      name: "",
      username: "",
      age: "",
      nationality: "",
    });
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error while adding new user...</h2>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameID">Name</label>
          <br />
          <input
            type="text"
            id="nameID"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="ageID">Age</label>
          <br />
          <input
            type="number"
            id="ageID"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="usernameID">Username</label>
          <br />
          <input
            type="text"
            id="usernameID"
            name="username"
            value={user.username}
            required
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="nationalityID">Nationality</label>
          <br />
          <input
            type="text"
            id="nationalityID"
            name="nationality"
            value={user.nationality}
            required
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
export default CreateUser;
