import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { taskActions } from "../store/task-slice";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <header className="navbar">
      <ul>
        <li>
          <Link to="/task1"> TASK 1</Link>
        </li>
        <li>
          <Link to="/task2"> TASK 2</Link>
        </li>
        <li>
          <Link to="/task3"> TASK 3</Link>
        </li>
      </ul>

      <Link className="logout" to="/">
        <button onClick={() => dispatch(taskActions.onLogout())}>Logout</button>
      </Link>
    </header>
  );
};

export default NavBar;
