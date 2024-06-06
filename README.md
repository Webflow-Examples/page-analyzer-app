# Page Content Data Client App

A [Webflow Data Client App](https://developers.webflow.com/data/docs/data-clients) example that has the following:

- Built with [Astro](https://astro.build/), a modern web framework with an all-in-one front-end / back-end
- [Webflow OAuth](https://developers.webflow.com/data/reference/authorization) flow
- Using the [Webflow JS SDK](https://github.com/webflow/js-webflow-api) to call various Webflow Data v2 APIs ([List Sites](https://developers.webflow.com/data/reference/list-sites), [List Pages](https://developers.webflow.com/data/reference/list-pages), [Get Page Content](https://developers.webflow.com/data/reference/get-static-content))
- Use [Textgears API](https://textgears.com/api#readability) to analyze page content readability
- Use [Groq API](https://console.groq.com/docs/text-chat) to summarize page content to a 2nd grader level

## 🚀 Project Structure

Inside of this project, note the following folders and files:

```text
/
|
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── api
│           └── auth.ts
│           └── ...
│       └── features/
│           └── readability-score.astro
│           └── ...
│       └── index.astro
│       └── ...
|── package.json
└── .env
```

### APIs

In the `api/` folder, you'll find each of the routes we use in the example app to authenticate this app with Webflow, and call out to other various APIs for the different features used here. Each file is exposed as a route based on the location of the file from the `pages` folder + file name (i.e., `auth.ts` is an API route we define to get the Webflow OAuth URL, which can be called at `GET: /api/auth`).

### .astro Files

Astro looks for `.astro` files in the `src/pages/` directory. Each page here is also exposed as a route based on its location and file name (i.e., The summarized content feature page is at `/features/summarized-content`).

These files contain the HTML/CSS/JS needed to render that page and call out to our own APIs in the `/api/` folder and are server-side rendered (SSR). Read up on Astro docs to learn more about the [JSX syntax and patterns](https://docs.astro.build/en/basics/astro-syntax/).

## 🧞 Try it Out

Want to try the app out or experiment with the code locally? Follow along below!

### Prerequisites

1. Setup [ngrok](https://developers.webflow.com/data/docs/getting-started-data-clients#step-1-setup-your-local-development-environment) locally
   - Sign up for a [free ngrok account](https://ngrok.com/download)
   - Install ngrok on your machine, and authenticate ngrok with [your auth token](https://dashboard.ngrok.com/get-started/your-authtoken) via `ngrok config add-authtoken <token>`
2. Clone this project down to your local machine, and `cd` into the project

### Setup Guide

1. Run `npm i` to install dependencies
2. Run `npm run dev` to start the local dev server at `http://localhost:4321`
3. In a separate terminal tab, run `npm run ngrok` to route your localhost port to an `https://` endpoint by ngrok (you should see something like "Forwarding `https://xyz123-free.app` -> `http://localhost:4321`")
4. [Register a Webflow Data Client app](https://developers.webflow.com/data/docs/register-an-app#register-an-app) in your workspace, fill in your own details but input the following values for the fields below
   - App Info:
     - **App homepage URL:** This should be the URL ngrok provided (i.e. `https://xyz123-free.app`)
   - Building blocks:
     - Toggle the **Data client (REST API)** switch to "On"
     - **Redirect URI:** This should be the URL ngrok provided with `/api/auth` at the end (i.e. `https://xyz123-free.app/api/auth`)
     - Set the following scopes access below:
       - CMS: Read and write
       - Pages: Read and write
       - Sites: Read and write
5. You should now see a **Client ID** and **Secret ID** associated with your new app! Set those values in the `.env` file of this project for `WEBFLOW_CLIENT_ID` and `WEBFLOW_CLIENT_SECRET` respectively
6. In the same `.env` file, set `PUBLIC_WEBFLOW_BASE_URL` to be the ngrok URL (i.e., `https://xyz123-free.app`) and `PUBLIC_WEBFLOW_REDIRECT_URL` to be the same with `/auth` added at the end (i.e., `https://xyz123-free.app/auth`)
7. You'll need to terminate the process where you ran `npm run dev`, and restart it again to allow the `.env` values to propagate
8. Click the "Install" button on your app in the Webflow Dashboard and install it to a site to start!
9. To try some of the features in this app that ingest Webflow page content, you'll need to follow the optional set up steps below to get API keys from the 3rd party libraries used in this project.

### (Optional) Set up Groq

In order to use the "Summarized Content" feature at `/features/summarized-content`, you need to get an API key for Groq by [creating a free account](https://console.groq.com/keys) and set the value in the `.env` file for `GROQ_API_KEY`.

> Note that there is no credit card necessary to try out the APIs!

### (Optional) Set up Textgears

In order to use the "Readability" feature at `/features/readability-score`, you need to get an API key from Textgears by [creating a free account](https://textgears.com/user) and set the value in the `.env` file for `TEXTGEARS_API_KEY`.

> Note that there is no credit card necessary to try out the APIs!
