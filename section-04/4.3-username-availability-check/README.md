# Username Availability Checker

A React component that checks if a username is taken in real time.

## How It Works

- **Debounce:** Waits 500ms after you stop typing before sending a request.
- **Cancel Outdated Requests:** Uses `AbortController` to cancel previous calls so older responses don't overwrite newer ones.
- **Fast UI Updates:** Calculates `'idle'` or `'checking'` instantly during render instead of waiting for extra effect cycles.

## Statuses

- **Blank / Idle:** Less than 3 characters entered.
- **Checking…:** Waiting for debounce or API response.
- **Available:** Username is free to use.
- **Taken:** Username already exists.
- **Something went wrong:** Network or API error.

## Setup

1. Copy the code into your React project (e.g. `App.jsx`).
2. Make sure Tailwind CSS is installed.
3. Type `emilys` to test a taken username, or `testuser999` for an available one.
