# Fetchwrapper usage with sveltekit - problem reproduction

- `git clone git@github.com:0gust1/sveltekit-fetchwrapper-repro.git`
- `cd sveltekit-fetchwrapper-repro`
- `npm i && npm run dev`

## Problem description

To facilitate error management and avoid error management boilerplates on fetch requests, we use a small wrapper around the native `fetch` function.

example code in [src/lib/utils/fetchwrapper.ts](src/lib/utils/fetchwrapper.ts)

This wrapper can take a fetchlib instance parameter, in order to handle the sveltekit's special `fetch`

However, when using this wrapper in a `+page.server.ts` file:

- a fetch to an external API works.
- a fetch to an internal endpoint ( /api/example-123 here ) breaks.

When it break, we get the following stacktrace:
```
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
at async file://PROJECT_PATH/node_modules/@sveltejs/kit/src/exports/vite/dev/index.js:510:22  {
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
    at async Module.render_data (PROJECT_PATH/node_modules/@sveltejs/kit/src/runtime/server/data/index.js:111:17)  {
  input: '/api/example-123',
  code: 'ERR_INVALID_URL'
  }
  }
```

----

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
