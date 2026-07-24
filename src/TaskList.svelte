<script>
  import { filteredTasks, tasks } from "./stores";

  import TaskListItem from "./TaskListItem.svelte";

  export let alertsOn;

  // function to mark a task as complete, or return it to the array
  function completeTask(event) {
    const taskId = event.detail;

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

    const toggledToDone = tasks.toggle(taskId);
    if (toggledToDone) {
      if (alertsOn) {
        alert(compliments[index]);
      }
    }
  }

  // function to remove the specified task from the array
  function deleteTask(event) {
    const taskId = event.detail;
    tasks.remove(taskId);
  }

  function editTask(event) {
    const { id, text } = event.detail;
    tasks.updateText(id, text);
  }
</script>

<div>
  {#if $filteredTasks.length === 0}
    <p class="empty-state">No tasks in this view yet.</p>
  {/if}

  <ul>
    {#each $filteredTasks as task (task.id)}
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

  .empty-state {
    margin: 0 0 1rem;
    font-size: 1rem;
    opacity: 0.8;
  }
</style>
