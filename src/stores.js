import { derived, writable } from "svelte/store";

const STORAGE_KEY = "svelte-todo.tasks.v1";
const MAX_TASK_LENGTH = 200;

function generateTaskId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeTask(task) {
  if (!task || typeof task.text !== "string") {
    return null;
  }

  const text = task.text.trim().slice(0, MAX_TASK_LENGTH);
  if (!text) {
    return null;
  }

  return {
    id: typeof task.id === "string" && task.id ? task.id : generateTaskId(),
    text,
    done: Boolean(task.done),
    createdAt:
      typeof task.createdAt === "string" && task.createdAt
        ? task.createdAt
        : new Date().toISOString(),
  };
}

function sanitizeTasks(list) {
  if (!Array.isArray(list)) {
    return [];
  }

  return list.map(normalizeTask).filter(Boolean);
}

function loadTasks() {
  if (typeof localStorage === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeTasks(JSON.parse(raw)) : [];
  } catch (_error) {
    return [];
  }
}

function createTask(text) {
  const normalizedText = String(text).trim().slice(0, MAX_TASK_LENGTH);
  if (!normalizedText) {
    return null;
  }

  return {
    id: generateTaskId(),
    text: normalizedText,
    done: false,
    createdAt: new Date().toISOString(),
  };
}

function createTasksStore() {
  const { subscribe, set, update } = writable(loadTasks());

  if (typeof localStorage !== "undefined") {
    subscribe(($tasks) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify($tasks));
    });
  }

  return {
    subscribe,
    add(text) {
      const task = createTask(text);
      if (!task) {
        return;
      }

      update(($tasks) => [...$tasks, task]);
    },
    toggle(taskId) {
      let toggledToDone = false;

      update(($tasks) =>
        $tasks.map((task) => {
          if (task.id !== taskId) {
            return task;
          }

          const updatedTask = { ...task, done: !task.done };
          toggledToDone = updatedTask.done;
          return updatedTask;
        }),
      );

      return toggledToDone;
    },
    remove(taskId) {
      update(($tasks) => $tasks.filter((task) => task.id !== taskId));
    },
    updateText(taskId, text) {
      const normalizedText = String(text).trim().slice(0, MAX_TASK_LENGTH);
      if (!normalizedText) {
        return;
      }

      update(($tasks) =>
        $tasks.map((task) =>
          task.id === taskId ? { ...task, text: normalizedText } : task,
        ),
      );
    },
    clear() {
      set([]);
    },
  };
}

// Array of tasks to do:
export const tasks = createTasksStore();

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
      return [...$tasks];
  }
});

// Current count of active tasks:
export const activeCount = derived(
  tasks,
  ($tasks) => $tasks.filter((task) => !task.done).length,
);
