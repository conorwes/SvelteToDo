<script>
  export let label = "";
  export let symbol;
</script>

<button on:click>
  <span role="img" aria-label={label} aria-hidden={label !== ""}>
    {symbol}
  </span>
</button>
