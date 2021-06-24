<script>
  import { filteredTasks, tasks } from "./stores";

  import TaskListItem from "./TaskListItem.svelte";

  export let alertsOn;

  // function to mark a task as complete, or return it to the array
  function completeTask(event) {
    const taskToComplete = event.detail;

    const compliments = [
      "Nice going!",
      "Nice job!",
      "Look at you go!",
      "You did it!",
      "Take a bow!",
      "Wow!",
      "Woohoo!",
      "Time for a Mai Tai! 🍹",
    ];
    const index = Math.floor(Math.random() * compliments.length);

    taskToComplete.done = !taskToComplete.done;

    if (taskToComplete.done) {
      if (alertsOn) {
        alert(compliments[index]);
      }
    }

    // need to do this to refresh the styling
    pushTaskChangeToStore(taskToComplete);
  }

  // function to remove the specified task from the array
  function deleteTask(event) {
    const taskToDelete = event.detail;
    tasks.update((values) => values.filter((row) => row !== taskToDelete));
  }

  function editTask(event) {
    const taskToEdit = event.detail;
    pushTaskChangeToStore(taskToEdit);
  }

  /**
   * Ensures the specified task is pushed to the store with any changes.
   */
  function pushTaskChangeToStore(updatedTask) {
    tasks.update((values) =>
      values.map((value) => (value === updatedTask ? updatedTask : value)),
    );
  }
</script>

<div>
  <ul>
    {#each $filteredTasks as task}
      <TaskListItem
        {task}
        on:complete={completeTask}
        on:delete={deleteTask}
        on:edit={editTask}
      />
    {/each}
  </ul>
</div>

<style>
  div {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 60vh;
  }

  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--font-monospace);
    font-size: 1.5rem;
    background-color: transparent;
  }
</style>
