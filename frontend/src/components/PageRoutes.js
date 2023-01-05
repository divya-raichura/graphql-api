import {  useState } from "react";
import DisplayMovies from "./DisplayMovies";
import DisplayUsers from "./DisplayUsers";

const USERS = "users";
const MOVIES = "movies";

function PageRoutes() {
  const [toggle, setToggle] = useState(USERS);

  return (
    <div>
      <div>
        <button onClick={() => setToggle(USERS)} style={{ margin: "2px" }}>
          Users
        </button>
        <button onClick={() => setToggle(MOVIES)} style={{ margin: "2px" }}>
          Movies
        </button>
      </div>
      <div>
        <h1>List of {toggle}</h1>
        <div>
          {toggle === USERS && <DisplayUsers />}
          {toggle === MOVIES && <DisplayMovies />}
        </div>
      </div>
      <hr />
    </div>
  );
}
export default PageRoutes;
