import { derived, writable } from "svelte/store";

// Array of tasks to do:
export const tasks = writable([]);

// Used to keep track of filter mode:
export const mode = writable("all");

export const filteredTasks = derived([tasks, mode], ([$tasks, $mode]) => {
  switch ($mode) {
    case "all":
      return [...$tasks];

    case "active":
      return $tasks.filter((task) => !task.done);

    case "completed":
      return $tasks.filter((task) => task.done);

    default:
      return [];
  }
});

// Current count of active tasks:
export const activeCount = derived(
  tasks,
  ($tasks) => $tasks.filter((task) => !task.done).length,
);
