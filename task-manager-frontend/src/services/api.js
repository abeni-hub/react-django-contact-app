const BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories/`);
  return res.json();
}
export async function fetchTasks() {
  const response = await fetch("http://127.0.0.1:8000/api/tasks/");
  return response.json();
}

export async function createTask(task) {
  const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return response.json();
}

