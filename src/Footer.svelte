<script>
  import { createEventDispatcher } from "svelte";

  export let count;
  export let mode;
  export let alertsOn;

  const dispatchEvent = createEventDispatcher();

  // function to filter active tasks
  function filterActiveTasks() {
    mode = "active";
  }

  // function to filter all tasks
  function filterAllTasks() {
    mode = "all";
  }

  // function to filter active tasks
  function filterCompletedTasks() {
    mode = "completed";
  }

  function handleClearClick() {
    dispatchEvent("clear");
  }
</script>

<footer>
  <span>
    {#if count === 1}
      {count} task remaining
    {:else}
      {count} tasks remaining
    {/if}
  </span>
  <span>|</span>
  <span>
    Showing {mode} tasks
  </span>
  <span>|</span>
  <button on:click={filterAllTasks}>All</button>
  <span>|</span>
  <button on:click={filterActiveTasks}>Active</button>
  <span>|</span>
  <button on:click={filterCompletedTasks}>Completed</button>
  <span>|</span>
  <button on:click={handleClearClick}>Clear All Tasks</button>
  <span>|</span>
  <button on:click={() => (alertsOn = !alertsOn)}>Toggle Alerts</button>
</footer>

<style>
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }

  button,
  span {
    padding: 0.5rem;
  }
</style>
