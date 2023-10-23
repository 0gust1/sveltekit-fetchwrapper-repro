<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>internal api load</h1>
<p>Result from internal api load:</p>
<pre>
	{JSON.stringify(data, null, 2)}
</pre>
