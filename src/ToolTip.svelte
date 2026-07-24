<script>
  export let title = "";
</script>

<span class="tooltip-wrapper">
  <slot />

  {#if title}
    <span role="tooltip" class="tooltip">{title}</span>
  {/if}
</span>

<style>
  .tooltip-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .tooltip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 0.4rem);
    transform: translateX(-50%);
    font-size: 1rem;
    font-family: var(--font-monospace);
    max-width: 16rem;
    text-align: left;
    opacity: 0;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.78);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 0.35rem;
    padding: 0.4rem 0.5rem;
    transition: opacity 140ms ease;
  }

  .tooltip-wrapper:hover .tooltip,
  .tooltip-wrapper:focus-within .tooltip {
    opacity: 1;
  }
</style>
