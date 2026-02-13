import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "./services/api";

function App() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchTasks().then(setTasks);
  }, []);

  function handleCreateTask() {
    if (!title || !selectedCategory) return;

    const newTaskData = {
      title,
      description,
      status: "pending",
      category: selectedCategory,
    };

    createTask(newTaskData).then((newTask) => {
      setTasks([...tasks, newTask]);
      setTitle("");
      setDescription("");
      setSelectedCategory("");
    });
  }

  function handleDeleteTask(id) {
    deleteTask(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  }

  function handleStatusChange(task) {
    const nextStatus =
      task.status === "pending"
        ? "in_progress"
        : task.status === "in_progress"
        ? "completed"
        : "pending";

    updateTask(task.id, { status: nextStatus }).then((updatedTask) => {
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    });
  }

  const filteredTasks =
    filterCategory === ""
      ? tasks
      : tasks.filter(
          (task) => String(task.category) === filterCategory
        );

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Workspace
        </h1>

        {/* Create Task */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Task title"
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Details"
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Assign Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreateTask}
            className="bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select
            className="border p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500">
              No tasks available
            </p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-xl p-4 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {task.description}
                  </p>

                  <span
                    className={`mt-2 inline-block text-xs px-2 py-1 rounded-full
                      ${
                        task.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : task.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(task)}
                    className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition"
                  >
                    Change
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
