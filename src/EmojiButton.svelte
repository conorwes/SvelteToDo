<script>
  export let label = "";
  export let symbol;
  export let type = "button";
</script>

<button {type} on:click aria-label={label || undefined}>
  <span aria-hidden="true">
    {symbol}
  </span>
</button>
