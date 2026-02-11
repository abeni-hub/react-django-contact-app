function TaskList({ tasks = [] }) {
  return (
    <div>
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Category ID: {task.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
