# Quote Wall

A small React + Tailwind app that shows a list of quotes with a "Load more" button and a featured quote that changes by itself.

Data comes from the [DummyJSON Quotes API](https://dummyjson.com/docs/quotes).

## Features

**Part A: Quote list**

- Shows the first 10 quotes on page load
- "Load more" adds the next 10 below the existing ones
- No duplicate quotes
- When every quote is loaded, the button is replaced with "No more quotes"

**Part B: Featured quote**

- A featured quote at the top, fetched from `/quotes/random`
- Changes every 10 seconds
- A Pause / Resume button
- Stops changing while the browser tab is hidden, and continues when the user returns
- No requests are made while paused or while the tab is hidden

## Tech used

- React
- Tailwind CSS
- DummyJSON API

## Project structure

```
src/
  App.jsx                  main page: state, fetching, timer logic
  components/
    QuoteCard.jsx          shows one quote and its author
```

## How to run

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## How it works

### Load more (Part A)

- `getQuotes(skip)` fetches `/quotes?limit=10&skip=...`.
- `skip` is the number of quotes already on screen, so each click gets the next 10.
- The API returns a `total`. When `quotes.length >= total`, the button is replaced with "No more quotes".
- New quotes are filtered by `id` before being added, so duplicates cannot appear.
- The button is disabled while a request is running, so a double click cannot send the same request twice.

### Featured quote (Part B)

- `featured` stores the current random quote.
- `paused` stores whether the user pressed Pause.
- `tabHidden` stores whether the browser tab is hidden. It is kept up to date by a `visibilitychange` event listener.
- One `useEffect` starts a `setInterval` that fetches a random quote every 10 seconds.
- That effect depends on `[paused, tabHidden]`. When either changes, React runs the cleanup (`clearInterval`) and then runs the effect again.
- If `paused` or `tabHidden` is `true`, the effect returns early, so no timer starts and no requests are made.
- When the user resumes or comes back to the tab, a new quote loads immediately and the timer restarts.

## How to test

1. Click "Load more" 3 times. There should be 40 quotes with no duplicates.
2. To test the end state quickly, temporarily change `allLoaded` to `quotes.length >= 30`. After 3 clicks the button should become "No more quotes". Change it back afterwards.
3. Wait 10 seconds. The featured quote should change.
4. Click Pause. Open the Network tab. No new `random` requests should appear. Click Resume to continue.
5. Switch to another tab for 30+ seconds, then come back. The Network tab should show no `random` requests during that time.

## Possible improvements

- Show a countdown until the next featured quote
- Add a "Retry" button when a request fails
- Add a loading skeleton for the featured quote
