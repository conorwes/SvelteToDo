<script>
  import { mode, tasks, activeCount } from "./stores";

  export let alertsOn;

  // function to clear all tasks
  function clearAllTasks() {
    if ($tasks.length !== 0) {
      tasks.clear();

      if (alertsOn) {
        alert("All done! Time for a drink! 🍸");
      }
    }
  }
</script>

<footer>
  <span class="summary">
    {$activeCount}
    {$activeCount === 1 ? "task" : "tasks"} remaining
  </span>
  <span class="summary">
    Showing {$mode} tasks
  </span>

  <nav aria-label="Task filters" class="filters">
    <button on:click={() => mode.set("all")} aria-pressed={$mode === "all"}>
      All
    </button>
    <button
      on:click={() => mode.set("active")}
      aria-pressed={$mode === "active"}
    >
      Active
    </button>
    <button
      on:click={() => mode.set("completed")}
      aria-pressed={$mode === "completed"}
    >
      Completed
    </button>
  </nav>

  <button on:click={clearAllTasks} disabled={$tasks.length === 0}>
    Clear all tasks
  </button>
  <button
    on:click={() => (alertsOn = !alertsOn)}
    aria-pressed={alertsOn}
    title="Toggles celebratory alerts when completing or clearing tasks"
  >
    Alerts: {alertsOn ? "On" : "Off"}
  </button>
</footer>

<style>
  footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    padding: 0.75rem 1rem 1rem;
  }

  button,
  .summary {
    padding: 0.35rem 0.5rem;
    font-family: var(--font-regular);
  }

  .filters {
    display: flex;
    gap: 0.4rem;
  }

  button[aria-pressed="true"] {
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
  }
</style>
