import { useQuery, gql } from "@apollo/client";
import MovieDetails from "./MovieDetails";

const ALL_MOVIES = gql`
  query QueryAllMovies {
    movies {
      id
      name
    }
  }
`;

function DisplayMovies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  if (loading) {
    return <h1>Loading all movies...</h1>;
  }

  if (error) {
    return <h1>Error while fetching all movies...</h1>;
  }

  return (
    <div>
      {/* {data && (
        <ul>
          {data.movies.map((item) => (
            <User key={item.id} {...item} />
          ))}
        </ul>
      )} */}
      <ul>
        {data.movies.map((item) => (
          <Movie key={item.id} {...item} />
        ))}
      </ul>
      <hr />
      <div>
        <h1>Get Movie Details</h1>
        <MovieDetails />
      </div>
    </div>
  );
}

function Movie({ id, name }) {
  return (
    <li>
      <ul>
        <li>id: {id}</li>
        <li>name: {name}</li>
      </ul>
    </li>
  );
}

export default DisplayMovies;
