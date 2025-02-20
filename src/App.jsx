import { useState } from "react";
import Tasks from "./components/Tasks";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tasks></Tasks>
      <div className="card">
        <h2>Task Manager J27</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
