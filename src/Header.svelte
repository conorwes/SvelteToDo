<script>
  import { tasks } from "./stores";

  // buttons are so 2000's, let's use emojis instead
  import EmojiButton from "./EmojiButton.svelte";

  // tooltips are helpful
  import ToolTip from "./ToolTip.svelte";

  let taskDescription = "";

  // string to hold the title
  $: title = selectRandomTitle();

  // function to select a random title
  function selectRandomTitle() {
    const titles = [
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
    const index = Math.floor(Math.random() * titles.length);
    return titles[index];
  }

  // function to add task if users presses enter, instead of clicking the button
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  };

  // function to add a new task to the array
  function addTask() {
    if (taskDescription !== "") {
      tasks.update((values) => [
        ...values,
        { done: false, text: taskDescription, deleted: false },
      ]);
    }
    taskDescription = "";
  }
</script>

<header>
  <h1>{title}</h1>
  <div>
    <ToolTip
      title="Type something that needs to get done, then press Enter or click ✔️ below to add it to the list."
    >
      <input
        id="description"
        name="description"
        type="text"
        bind:value={taskDescription}
        placeholder="What needs to be done?"
        on:keydown={onKeyDown}
        size="25"
      />
    </ToolTip>
    <ToolTip title="Click to add this new task to the list.">
      <EmojiButton on:click={addTask} symbol="✔️" label="Add Task" />
    </ToolTip>
  </div>
</header>

<style>
  header {
    padding: 2rem;
  }

  h1 {
    margin: 0 0 2rem 0;
    font-size: 4rem;
    font-weight: 400;
    text-align: center;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    margin-right: 0.75rem;
    background-color: transparent;
    font-style: italic;
    font-family: var(--font-monospace);
  }
</style>
