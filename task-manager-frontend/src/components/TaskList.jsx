function TaskList({ tasks }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border rounded p-3 bg-white shadow-sm"
            >
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">
                Category ID: {task.category}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
