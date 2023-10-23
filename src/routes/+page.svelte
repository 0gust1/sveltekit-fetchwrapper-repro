<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Fetchwrapper problem demo</h1>
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
<hr />
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

<p>When it break, I get the following stacktrace:</p>
<pre>
TypeError: Failed to parse URL from /api/example-123
at new Request (PROJECT_PATH/node_modules/undici/lib/fetch/request.js:87:15)
at Module.get (PROJECT_PATH/src/lib/utils/fetchWrapper.ts:83:23)
at load (PROJECT_PATH/src/routes/internal-api-load-wrapped/+page.server.ts:5:27)
at Module.load_server_data (PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/page/load_data.js:51:41)
at PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/data/index.js:62:13
at async Promise.all (index 1)
at async Module.render_data (PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/data/index.js:100:17)
at async resolve (PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/respond.js:394:17)
at async Module.respond (PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/respond.js:274:20)
at async file://PROJECT_PATH/node_modules/@sveltejs/kit/src/exports/vite/dev/index.js:510:22  &lcub;
[cause]: TypeError [ERR_INVALID_URL]: Invalid URL
    at new NodeError (node:internal/errors:393:5)
    at URL.onParseError (node:internal/url:565:9)
    at new URL (node:internal/url:645:5)
    at new Request (PROJECT_PATH/node_modules/undici/lib/fetch/request.js:85:21)
    at Module.get (PROJECT_PATH/src/lib/utils/fetchWrapper.ts:52:21)
    at load (PROJECT_PATH/src/routes/internal-api-load-wrapped/+page.server.ts:8:50)
    at Module.load_server_data (PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/page/load_data.js:57:41)
    at eval (PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/data/index.js:73:35)
    at async Promise.all (index 1)
    at async Module.render_data (PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/data/index.js:111:17)  &lcub;
  input: '/api/example-123',
  code: 'ERR_INVALID_URL'
  &rcub;
  &rcub;
</pre>

<style>
	.error {
		color: red;
	}
</style>
