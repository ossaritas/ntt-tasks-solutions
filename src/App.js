import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./Login";
import Tasks from "./Tasks/Tasks";

function App() {
  const isLogin = useSelector((state) => state.task.isLogin);
  return (
    <Routes>
      {isLogin ? (
        <Route path="/" element={<Login />} />
      ) : (
        <Route path="/*" element={<Tasks />} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
