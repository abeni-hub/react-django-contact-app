import { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import TaskList from "./components/TaskList";
import { fetchCategories, fetchTasks } from "./services/api";

function App() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));

    fetchTasks().then((data) => {
  setTasks(data);
});
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <CategoryList categories={categories} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
