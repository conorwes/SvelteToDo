<script>
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import TaskList from "./TaskList.svelte";

  // flag to handle alert status
  let alertsOn = true;
</script>

<Header />

<main>
  <TaskList {alertsOn} />
</main>

<Footer bind:alertsOn />

<style>
  main {
    padding: 1rem;
    margin: 0 auto;
    width: 100%;
    max-width: 52rem;
    text-align: center;
  }
</style>
