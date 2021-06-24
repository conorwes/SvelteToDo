<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Emoji from "./Emoji.svelte";
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
      <button on:click={handleCompleteClick}>
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
      <button on:click={handleDeleteClick}>
        <Emoji symbol="🗑️" label="Delete" />
      </button>
    </ToolTip>
  </td>
</tr>

<style>
</style>
