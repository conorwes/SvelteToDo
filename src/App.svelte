<script>
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import TaskList from "./TaskList.svelte";

  // array of tasks to do
  let tasks = [];

  // counter for the bottom of the page
  let count = 0;

  // flag to handle alert status
  let alertsOn = true;

  // toggles mode
  let mode = "all";
</script>

<Header bind:tasks />

<main>
  <TaskList bind:count bind:tasks {alertsOn} {mode} />
</main>

<Footer bind:alertsOn bind:mode bind:tasks {count} />

<style>
  main {
    padding: 1rem;
    margin: 0 auto;
    width: 100%;
    max-width: 52rem;
  }
</style>
