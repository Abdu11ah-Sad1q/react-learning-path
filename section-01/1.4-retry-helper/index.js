/*
setTimeout(() => {
  console.log("Timer done!");
}, 1000);
console.log("This runs immediately!"); // Runs BEFORE the timer finishes! 
*/

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(fn, retries, delay = 500) {
  let attempt = 1;

  while (retries >= 0) {
    try {
      console.log(`Attempt ${attempt}: running...`);
      return await fn(); // if it works, return the value immediately
    } catch (err) {
      console.log(`Attempt ${attempt} failed.`);

      if (retries === 0) {
        throw err;
      }

      // Otherwise, wait, double the delay, and decrement retries
      console.log(`Waiting ${delay}ms before trying again...`);
      await wait(delay);

      delay = delay * 2; // 500 -> 1000 -> 2000...
      retries--;
      attempt++;
    }
  }
}

// A fake network call that fails ~50% of the time
async function fakeNetworkRequest() {
  if (Math.random() < 0.5) {
    throw new Error("503 Service Unavailable");
  }
  return "Data received successfully!";
}

// Running the test
async function test() {
  try {
    const result = await retry(fakeNetworkRequest, 5, 500);
    console.log("FINAL RESULT:", result);
  } catch (error) {
    console.log("ALL RETRIES FAILED. Last error:", error.message);
  }
}

test();
