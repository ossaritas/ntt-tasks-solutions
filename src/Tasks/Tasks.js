import NavBar from "../UI/NavBar";
import TaskOne from "./TaskOne";
import TaskTwo from "./TaskTwo";
import TaskThree from "./TaskThree";
import { Route, Routes } from "react-router-dom";

function Tasks() {
  return (
    <div className="main-container">
      <NavBar />
      <Routes>
        <Route path="/task1" element={<TaskOne />} />
        <Route path="/task2" element={<TaskTwo />} />
        <Route path="/task3" element={<TaskThree />} />
      </Routes>
    </div>
  );
}

export default Tasks;
