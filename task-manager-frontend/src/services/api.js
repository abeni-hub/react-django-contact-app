const BASE_URL = "http://127.0.0.1:8000/api";

// GET Categories
export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/categories/`);
  return response.json();
}

// GET Tasks
export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/tasks/`);
  return response.json();
}

// POST Task
export async function createTask(task) {
  const response = await fetch(`${BASE_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return response.json();
}
