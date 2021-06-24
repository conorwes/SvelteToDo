<script>
  export let label;
  export let symbol;
</script>

<span
  class="emoji"
  role="img"
  aria-label={label ? label : ""}
  aria-hidden={label ? "false" : "true"}
>
  {symbol}
</span>
