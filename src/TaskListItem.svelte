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
</script>

<tr class:done={task.done}>
  <td>
    <ToolTip title="Click to toggle whether this task has been completed.">
      <EmojiButton
        on:click={handleCompleteClick}
        symbol="🏆"
        label="Completed"
      />
    </ToolTip>
  </td>
  <td>
    <ToolTip title="Click to edit this task.">
      <span contenteditable="true" bind:innerHTML={task.text} />
    </ToolTip>
  </td>
  <td>
    <ToolTip title="Click to delete this task from the list.">
      <EmojiButton on:click={handleDeleteClick} symbol="🗑️" label="Delete" />
    </ToolTip>
  </td>
</tr>

<style>
  .done {
    opacity: 0.25;
    text-decoration: line-through;
  }

  td {
    color: white;
  }
</style>
