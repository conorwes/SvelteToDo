<script>
  import { createEventDispatcher } from "svelte";

  import EmojiButton from "./EmojiButton.svelte";
  import ToolTip from "./ToolTip.svelte";

  export let task;

  const dispatchEvent = createEventDispatcher();
  let isEditing = false;
  let draftText = task.text;

  $: if (!isEditing) {
    draftText = task.text;
  }

  function handleCompleteClick() {
    dispatchEvent("complete", task.id);
  }

  function handleDeleteClick() {
    dispatchEvent("delete", task.id);
  }

  function startEdit() {
    isEditing = true;
  }

  function cancelEdit() {
    draftText = task.text;
    isEditing = false;
  }

  function saveEdit() {
    const nextText = draftText.trim();
    if (!nextText) {
      cancelEdit();
      return;
    }

    dispatchEvent("edit", { id: task.id, text: nextText });
    isEditing = false;
  }
</script>

<li class:done={task.done}>
  <div>
    <ToolTip title="Click to toggle whether this task has been completed.">
      <EmojiButton
        on:click={handleCompleteClick}
        symbol="🏆"
        label={task.done ? "Mark as active" : "Mark as completed"}
      />
    </ToolTip>
  </div>

  {#if isEditing}
    <div class="edit-group">
      <input
        type="text"
        bind:value={draftText}
        aria-label="Edit task"
        maxlength="200"
      />
      <ToolTip title="Save this task text.">
        <EmojiButton on:click={saveEdit} symbol="💾" label="Save task" />
      </ToolTip>
      <ToolTip title="Cancel editing this task.">
        <EmojiButton on:click={cancelEdit} symbol="✖️" label="Cancel edit" />
      </ToolTip>
    </div>
  {:else}
    <div class="task-text">{task.text}</div>
    <ToolTip title="Click to edit this task text.">
      <EmojiButton on:click={startEdit} symbol="✏️" label="Edit task" />
    </ToolTip>
  {/if}

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
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    max-width: 44rem;
    padding: 0.5rem;
  }

  .task-text {
    flex: 1;
    text-align: left;
    word-break: break-word;
  }

  .edit-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  input {
    flex: 1;
  }
</style>
