<script>
  export let alertsOn;
  export let count;
  export let mode;
  export let tasks;

  // function to clear all tasks
  function clearAllTasks() {
    if (tasks.length !== 0) {
      tasks = [];
      if (alertsOn) {
        alert("All done! Time for a drink! 🍸");
      }
    }
  }
</script>

<footer>
  <span>
    {count}
    {count === 1 ? "task" : "tasks"} remaining
  </span>
  <span>|</span>
  <span>
    Showing {mode} tasks
  </span>
  <span>|</span>
  <button on:click={() => (mode = "all")}>All</button>
  <span>|</span>
  <button on:click={() => (mode = "active")}>Active</button>
  <span>|</span>
  <button on:click={() => (mode = "completed")}>Completed</button>
  <span>|</span>
  <button on:click={clearAllTasks}>Clear All Tasks</button>
  <span>|</span>
  <button on:click={() => (alertsOn = !alertsOn)}>Toggle Alerts</button>
</footer>

<style>
  footer {
    position: fixed;
    inset: auto 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }

  button,
  span {
    padding: 0.5rem;
    font-family: var(--font-regular);
  }
</style>
