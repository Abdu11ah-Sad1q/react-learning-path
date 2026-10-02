# Loading Carts from an API

This project loads three shopping carts from the DummyJSON API (`/carts/1`, `/carts/2`, `/carts/3`) and prints a small report: the number of products and total price of each cart, plus the grand total.

It is written in three versions to compare different ways of loading the data.

## How to run

```bash
node index.js
```

(Requires Node.js 18 or newer, because it uses the built-in `fetch`.)

## Shared helper functions

- `fetchCart(cartId)` loads one cart. If the server answers with an error status, it throws a readable error message.
- `printReport(carts)` prints each cart (or its error) and the grand total. Failed carts are marked as `FAILED` and are not added to the grand total.

## Version A: one by one

The carts are loaded in a `for` loop using `await`. Cart 2 only starts loading after cart 1 is finished, and cart 3 after cart 2. The time of each cart and the total time are logged.

This is the simplest approach, but also the slowest, because the requests wait for each other.

## Version B: parallel

All three requests are started at the same time using `cartIds.map(...)`, and `Promise.all` waits until all of them are done. Each request has a `.catch(...)` so one failed request does not stop the others.

The total time is about the time of the slowest single request, so it is clearly faster than Version A.

## Version C: parallel with a 3 second timeout

This version is like Version B, but every request must finish within 3 seconds.

- `timeoutAfter3Seconds(cartId)` creates a timer that fails with a "timed out" error after 3 seconds.
- `Promise.race([request, timer])` takes whichever finishes first. If the request wins, we get the cart. If the timer wins, the cart counts as failed.
- To prove it works, cart 2 is deliberately slowed down with `fetchSlowCart`, which waits 5 seconds before loading. It always loses the race.
- The `.catch(...)` turns the error into `{ error: "..." }`, so the other two carts are still reported.

**Expected result:** carts 1 and 3 are reported, cart 2 shows `FAILED - Reason: Cart 2 timed out`, and the grand total only includes carts 1 and 3.

## Note

`Promise.race` stops waiting for the slow request, but it does not cancel it. Cancelling a request properly would need `AbortController`
