import { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import TaskList from "./components/TaskList";
import { fetchCategories, fetchTasks, createTask } from "./services/api";

function App() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Load categories
    fetchCategories().then((data) => setCategories(data));

    // Load tasks
    fetchTasks().then((data) => setTasks(data));
  }, []);

  function handleCreateTask() {
    if (!title || !selectedCategory) return;

    const newTaskData = {
      title: title,
      description: description,
      status: "pending",
      category: selectedCategory,
    };

    createTask(newTaskData).then((newTask) => {
      setTasks([...tasks, newTask]);

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedCategory("");
    });
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <h2>Create Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button onClick={handleCreateTask}>
        Create Task
      </button>

      <CategoryList categories={categories} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
