import DisplayMovies from "./components/DisplayMovies";
import DisplayUsers from "./components/DisplayUsers";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <main>
      <div>
        <h1>List of users</h1>
        <DisplayUsers />
      </div>
      <hr />
      <div>
        <h1>List of movies</h1>
        <DisplayMovies />
      </div>
      <hr />
      <div>
        <h1>Get Movie Details</h1>
        <MovieDetails />
      </div>
    </main>
  );
}

export default App;
