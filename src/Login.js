import { useDispatch } from "react-redux";
import { taskActions } from "./store/task-slice";
const Login = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="login">
      <p>Please login to see the results</p>
      <button onClick={() => dispatch(taskActions.onLogin())}>
        <span>Login</span>
      </button>
    </div>
  );
};

export default Login;
