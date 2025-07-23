<script lang="ts">
  import { onMount } from 'svelte';
  let count = 0;
  onMount(() => {
    const interval = setInterval(() => count += 1, 1000);
    return () => clearInterval(interval);
  });
</script>

<h1 class="text-gold text-2xl">Empire Noir</h1>
<p>Count: {count}</p>
