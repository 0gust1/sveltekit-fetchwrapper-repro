<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Fetchwrapper problem demo</h1>

<p>
	To facilitate error management and avoid error management boilerplates on fetch requests, I use a
	small wrapper around the native fetch function.
</p>
<p>
	example code in <code>src/lib/utils/fetchwrapper.ts</code>
</p>
<p>
	This wrapper can take a fetchlib instance parameter, in order to handle the sveltekit's special <code
		>fetch</code
	>
</p>
<p>
	However, when using this wrapper in a <code>+page.server.ts</code> file:
</p>
<ul>
	<li>a fetch to an external API works.</li>
	<li>
		a fetch to an internal endpoint ( <code>/api/example-123</code> here ) breaks.
	</li>
</ul>
<hr />
<nav>
	<ul>
		<li>
			<a href={`${base}/internal-api-load`}>Internal api load example</a>
			&nbsp;<strong>WORKS (as expected)</strong>
		</li>
		<li>
			<a href={`${base}/external-api-load`}>External api load example</a>&nbsp;<strong
				>WORKS (as expected)</strong
			>
		</li>
		<li>
			<a href={`${base}/internal-api-load-wrapped`}>Wrapped fetch internal api load example</a
			>&nbsp;<strong class="error">BREAKS</strong>
		</li>
		<li>
			<a href={`${base}/external-api-load-wrapped`}>Wrapped fetch external api load example</a
			>&nbsp;<strong>WORKS</strong>
		</li>
	</ul>
</nav>

<style>
	.error {
		color: red;
	}
</style>
