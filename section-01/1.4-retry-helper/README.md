# Task 1.4: Retry Helper

Network requests sometimes fail for a moment and work on the next try. This helper runs an async action and retries it when it fails.

## Features

- Exponential backoff (500ms, 1000ms, 2000ms, ...)
- Configurable maximum retries
- Detailed attempt and wait time logging
- Simulated 50% failure network request test

## Implementation Details

- **`retry(fn, retries, delay)`**: Core helper executing an async function with progressive waiting on failure.
- **`NetworkRequest()`**: Mock network call designed to randomly throw a 503 error ~50% of the time.
- **`test()`**: Test runner that triggers `retry(NetworkRequest, 5, 500)`, logs progress per attempt, and handles the final outcome.

## Running the Test

Run the script from your terminal:

```bash
node section-01/1.4-retry-helper/index.js
```
