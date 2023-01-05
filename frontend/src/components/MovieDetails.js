import { useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";

const Get_Movie = gql`
  query GetMovie($naam: String!) {
    movie(name: $naam) {
      # parameter of this actual gql query : 'name' should match with server side parameter name
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

function MovieDetails() {
  const [movieName, setmovieName] = useState("");
  const [getMovie, { data, loading, error }] = useLazyQuery(Get_Movie);

  function handleSubmit(e) {
    e.preventDefault();
    getMovie({ variables: { naam: movieName } }); // 'naam' should match with query's parameter name, not compulsory to match with actual gql query parameter('name') as long as outer query parameter is used to run query
    setmovieName("");
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error while fetching movie...</h3>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameId">Movie Name: </label>
        <input
          id="nameId"
          name="nameOfMovie"
          value={movieName}
          type="text"
          onChange={(e) => setmovieName(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: "3px" }}>
          Get Details
        </button>
      </form>
      {data && (data.movie == null || <Movie {...data.movie} />)}
      {data && data.movie == null && <h3>No Such Movie In Database :(</h3>}
    </div>
  );
}

function Movie({ id, name, yearOfPublication, isInTheaters }) {
  return (
    <div>
      <ul>
        <li>id: {id}</li>
        <li>name: {name}</li>
        <li>yearOfPublication: {yearOfPublication}</li>
      </ul>
    </div>
  );
}

export default MovieDetails;
