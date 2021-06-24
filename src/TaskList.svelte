<script>
  import TaskListItem from "./TaskListItem.svelte";

  export let alertsOn;
  export let count;
  export let mode;
  export let tasks;

  let filteredTasks = [];

  $: setFilteredTasksByMode(mode, tasks);

  function setFilteredTasksByMode(currentMode, currentTasks) {
    const activeTasks = currentTasks.filter((task) => !task.done);

    switch (currentMode) {
      case "all":
        filteredTasks = [...currentTasks];
        break;

      case "active":
        filteredTasks = [...activeTasks];
        break;

      case "completed":
        filteredTasks = currentTasks.filter((task) => task.done);
        break;

      default:
        break;
    }

    count = activeTasks.length;
  }

  // function to mark a task as complete, or return it to the array
  function completeTask(event) {
    const taskToComplete = event.detail;

    let compliments = [
      "Nice going!",
      "Nice job!",
      "Look at you go!",
      "You did it!",
      "Take a bow!",
      "Wow!",
      "Woohoo!",
      "Time for a Mai Tai! 🍹",
    ];
    let index = Math.floor(Math.random() * compliments.length);

    if (!taskToComplete.done) {
      if (alertsOn) {
        alert(compliments[index]);
      }

      taskToComplete.done = true;
    } else {
      taskToComplete.done = false;
    }

    // need to do this to refresh the styling
    tasks = [...tasks];
  }

  // function to remove the specified task from the array
  function deleteTask(event) {
    const taskToDelete = event.detail;
    tasks = tasks.filter((row) => row !== taskToDelete);
  }
</script>

<div>
  <table>
    {#each filteredTasks as task}
      <TaskListItem {task} on:complete={completeTask} on:delete={deleteTask} />
    {/each}
  </table>
</div>

<style>
  div {
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 500px;
    max-width: 100%;
  }

  table {
    background-color: transparent;
    font-family: "Courier New", Courier, monospace;
    font-size: 1.5em;
    max-width: 100%;
  }
</style>
