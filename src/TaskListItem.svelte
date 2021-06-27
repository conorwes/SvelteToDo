<script>
  import { createEventDispatcher } from "svelte";

  import EmojiButton from "./EmojiButton.svelte";
  import ToolTip from "./ToolTip.svelte";

  export let task;

  const dispatchEvent = createEventDispatcher();

  function handleCompleteClick() {
    dispatchEvent("complete", task);
  }

  function handleDeleteClick() {
    dispatchEvent("delete", task);
  }

  // Ensure the store is getting updated with the updated text for the task:
  function handleEdit() {
    dispatchEvent("edit", task);
  }
</script>

<li class:done={task.done}>
  <div>
    <ToolTip title="Click to toggle whether this task has been completed.">
      <EmojiButton
        on:click={handleCompleteClick}
        symbol="🏆"
        label="Completed"
      />
    </ToolTip>
  </div>
  <div>
    <ToolTip title="Click to edit this task.">
      <span
        contenteditable="true"
        bind:innerHTML={task.text}
        on:input={handleEdit}
      />
    </ToolTip>
  </div>
  <div>
    <ToolTip title="Click to delete this task from the list.">
      <EmojiButton on:click={handleDeleteClick} symbol="🗑️" label="Delete" />
    </ToolTip>
  </div>
</li>

<style>
  .done {
    opacity: 0.25;
    text-decoration: line-through;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
</style>
