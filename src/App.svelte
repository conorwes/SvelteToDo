<script>
  // buttons are so 2000's, let's use emojis instead
  import Emoji from "./Emoji.svelte";

  // tooltips are helpful
  import ToolTip from "./ToolTip.svelte";

  // string task to do
  let input = "";

  // array of tasks to do
  let tasks = [];

  // array of active tasks
  let activeTasks = [];

  // flag to handle alert status
  let alertsOn = true;

  // array of completed tasks
  let completedTasks = [];

  // allows us to track the input field
  let inputField;

  // toggles mode
  let mode = "all";

  // reactive counter for the bottom of the page
  $: count = activeTasks.length;

  // string to hold the title
  $: title = selectRandomTitle();

  // function to add a new task to the array
  function addTask(taskToAdd) {
    if (taskToAdd != "") {
      tasks = [...tasks, { done: false, text: taskToAdd, deleted: false }];
    }
    inputField.value = "";
    refreshAllTasks();
  }

  // function to add task if users presses enter, instead of clicking the button
  const onKeyPress = (e) => {
    if (e.charCode === 13) addTask(inputField.value);
  };

  // function to clear all tasks
  function clearAllTasks() {
    if (tasks.length != 0) {
      tasks = [];
      refreshAllTasks();
      if (alertsOn) {
        alert("All done! Time for a drink! 🍸");
      }
    }
  }

  // function to mark a task as complete, or return it to the array
  function completeTask(taskToComplete) {
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
    refreshAllTasks();
  }

  // function to remove the specified task from the array
  function deleteTask(taskToDelete) {
    tasks = tasks.filter((row) => row != taskToDelete);
    refreshAllTasks();
  }

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

  // function to refresh the active tasks array
  function refreshAllTasks() {
    activeTasks = tasks.filter((r) => !r.done);
    completedTasks = tasks.filter((r) => r.done);
  }

  // function to select a random title
  function selectRandomTitle() {
    let titles = [
      "To-Do List",
      "Aufgabenliste",
      "Lista de Pendientes",
      "Liste de Choses à Faire",
      "Lista di Cose da Fare",
      "Lista de Afazeres",
      "Список Дел",
      "待办事项",
      "タスク一覧",
      "רשימת המטלות",
      "🍈🍈🍈", //get it, honeydew? honey do? i'm hilarious...
    ];
    let index = Math.floor(Math.random() * titles.length);
    return titles[index];
  }

  $: title = selectRandomTitle();

  // function to toggle alerts
  function toggleAlerts() {
    alertsOn = !alertsOn;
  }
</script>

<body>
  <main>
    <h1>{title}</h1>
    <h2>
      <table class="centered">
        <td>
          <ToolTip
            title="Type something that needs to get done, then press Enter or click ✔️ below to add it to the list."
          >
            <input
              name="inputField1"
              class="italic"
              type="text"
              bind:this={inputField}
              bind:value={input}
              placeholder="What needs to be done?"
              on:keypress={onKeyPress}
              size="25"
            />
          </ToolTip>
        </td>
        <td>
          <ToolTip title="Click to add this new task to the list.">
            <button on:click={addTask(inputField.value)}
              ><Emoji symbol="✔️" label="Add Task" /></button
            >
          </ToolTip>
        </td>
      </table>
    </h2>

    <div class="pane">
      <table class="main">
        {#if mode === "all"}
          {#each tasks as task}
            <tr class:done={task.done}>
              <td>
                <ToolTip
                  title="Click to toggle whether this task has been completed."
                >
                  <button on:click={completeTask(task)}>
                    <Emoji symbol="🏆" label="Completed" />
                  </button>
                </ToolTip>
              </td>
              <td>
                <ToolTip title="Click to edit this task.">
                  <td contenteditable="true" bind:innerHTML={task.text} />
                </ToolTip>
              </td>
              <td>
                <ToolTip title="Click to delete this task from the list.">
                  <button on:click={() => deleteTask(task)}>
                    <Emoji symbol="🗑️" label="Delete" />
                  </button>
                </ToolTip>
              </td>
            </tr>
          {/each}
        {:else if mode === "active"}
          {#each activeTasks as task}
            <tr class:done={task.done}>
              <td>
                <ToolTip
                  title="Click to toggle whether this task has been completed."
                >
                  <button on:click={completeTask(task)}>
                    <Emoji symbol="🏆" label="Completed" />
                  </button>
                </ToolTip>
              </td>
              <td>
                <ToolTip title="Click to edit this task.">
                  <td contenteditable="true" bind:innerHTML={task.text} />
                </ToolTip>
              </td>
              <td>
                <ToolTip title="Click to delete this task from the list.">
                  <button on:click={() => deleteTask(task)}>
                    <Emoji symbol="🗑️" label="Delete" />
                  </button>
                </ToolTip>
              </td>
            </tr>
          {/each}
        {:else}
          {#each completedTasks as task}
            <tr class:done={task.done}>
              <td>
                <ToolTip
                  title="Click to toggle whether this task has been completed."
                >
                  <button on:click={completeTask(task)}>
                    <Emoji symbol="🏆" label="Completed" />
                  </button>
                </ToolTip>
              </td>
              <td>
                <ToolTip title="Click to edit this task.">
                  <td contenteditable="true" bind:innerHTML={task.text} />
                </ToolTip>
              </td>
              <td>
                <ToolTip title="Click to delete this task from the list.">
                  <button on:click={() => deleteTask(task)}>
                    <Emoji symbol="🗑️" label="Delete" />
                  </button>
                </ToolTip>
              </td>
            </tr>
          {/each}
        {/if}
      </table>
    </div>

    <footer>
      <div class="counter">
        {#if count === 1}
          {count} task remaining
        {:else}
          {count} tasks remaining
        {/if}
      </div>
      <div class="spacer">|</div>
      <div class="mode">
        Showing {mode} tasks
      </div>
      <div class="spacer">|</div>
      <div class="filterAll">
        <button on:click={() => filterAllTasks()}>All</button>
      </div>
      <div class="spacer">|</div>
      <div class="filterActive">
        <button on:click={() => filterActiveTasks()}>Active</button>
      </div>
      <div class="spacer">|</div>
      <div class="filterCompleted">
        <button on:click={() => filterCompletedTasks()}>Completed</button>
      </div>
      <div class="spacer">|</div>
      <div class="clear">
        <button on:click={() => clearAllTasks()}>Clear All Tasks</button>
      </div>
      <div class="spacer">|</div>
      <div class="toggle">
        <button on:click={() => toggleAlerts()}>Toggle Alerts</button>
      </div>
    </footer>
  </main>
</body>

<style>
  body {
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/f/f3/43228_1_miscellaneous_digital_art_simple_simple_patterns.jpg");
    background-size: cover;
    text-align: center;
  }

  * {
    background-color: transparent;
    color: white;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    max-width: 100%;
  }

  h1 {
    color: white;
    font-size: 5em;
    font-weight: 400;
    font-family: "Courier New", Courier, monospace;
  }

  h2 {
    align-items: center;
    color: white;
    font-size: 1.5em;
    font-family: "Courier New", Courier, monospace;
    text-align: center;
    padding: 1em;
    max-width: 100%;
    margin: 0 auto;
  }

  table.main {
    background-color: transparent;
    font-family: "Courier New", Courier, monospace;
    font-size: 1.5em;
    max-width: 100%;
  }

  .pane {
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 500px;
    max-width: 100%;
  }

  .centered {
    margin-left: auto;
    margin-right: auto;
  }

  .italic {
    font-style: italic;
  }

  button {
    background-color: transparent;
    border: none;
  }

  .done {
    opacity: 0.25;
    text-decoration: line-through;
  }

  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  .counter {
    display: inline;
  }

  .mode {
    display: inline;
  }

  .spacer {
    display: inline;
    padding: 5px;
  }

  .filterAll {
    display: inline;
  }

  .filterActive {
    display: inline;
  }

  .filterCompleted {
    display: inline;
  }

  .toggle {
    display: inline;
  }

  .clear {
    display: inline;
  }
</style>
