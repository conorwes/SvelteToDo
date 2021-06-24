<script>
  // buttons are so 2000's, let's use emojis instead
  import Emoji from "./Emoji.svelte";

  // tooltips are helpful
  import ToolTip from "./ToolTip.svelte";
  import Footer from "./Footer.svelte";
  import Task from "./Task.svelte";

  let taskDescription = "";

  // array of tasks to do
  let tasks = [];

  let filteredTasks = [];

  let count = 0;

  // flag to handle alert status
  let alertsOn = true;

  // toggles mode
  let mode = "all";

  // string to hold the title
  $: title = selectRandomTitle();

  $: setFilteredTasksByMode(mode, tasks);

  function setFilteredTasksByMode(currentMode, currentTasks) {
    const activeTasks = currentTasks.filter((task) => !task.done);

    if (currentMode === "all") {
      filteredTasks = [...currentTasks];
    } else if (currentMode === "active") {
      filteredTasks = [...activeTasks];
    } else if (currentMode === "completed") {
      filteredTasks = currentTasks.filter((task) => task.done);
    }

    // reactive counter for the bottom of the page
    count = activeTasks.length;
  }

  // function to add a new task to the array
  function addTask() {
    if (taskDescription !== "") {
      tasks = [
        ...tasks,
        { done: false, text: taskDescription, deleted: false },
      ];
    }
    taskDescription = "";
  }

  // function to add task if users presses enter, instead of clicking the button
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // function to clear all tasks
  function clearAllTasks() {
    if (tasks.length !== 0) {
      tasks = [];
      if (alertsOn) {
        alert("All done! Time for a drink! 🍸");
      }
    }
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
              bind:value={taskDescription}
              placeholder="What needs to be done?"
              on:keypress={onKeyPress}
              size="25"
            />
          </ToolTip>
        </td>
        <td>
          <ToolTip title="Click to add this new task to the list.">
            <button on:click={addTask}
              ><Emoji symbol="✔️" label="Add Task" /></button
            >
          </ToolTip>
        </td>
      </table>
    </h2>

    <div class="pane">
      <table class="main">
        {#each filteredTasks as task}
          <Task {task} on:complete={completeTask} on:delete={deleteTask} />
        {/each}
      </table>
    </div>
  </main>

  <Footer bind:mode bind:alertsOn {count} on:clear={clearAllTasks} />
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
</style>
