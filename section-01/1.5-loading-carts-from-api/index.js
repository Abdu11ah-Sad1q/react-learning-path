async function fetchCart(cartId) {
  const response = await fetch(`https://dummyjson.com/carts/${cartId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to load Cart ${cartId} (Status: ${response.status})`,
    );
  }
  return await response.json();
}

function printReport(carts) {
  let grandTotal = 0;

  for (let i = 0; i < carts.length; i++) {
    if (carts[i].error) {
      console.log(`Cart ${i + 1}: FAILED - Reason: ${carts[i].error}`);
    } else {
      console.log(
        `Cart ${carts[i].id}: ${carts[i].totalProducts} products, Total Price: $${carts[i].total.toFixed(2)}`,
      );
      grandTotal += carts[i].total;
    }
  }

  console.log(`Grand Total: $${grandTotal.toFixed(2)}\n`);
}

async function runVersionA() {
  console.log("Running Version A (one by one)");
  const totalStartTime = Date.now();

  const cartIds = [1, 2, 3];
  const carts = [];

  for (let i = 0; i < cartIds.length; i++) {
    const id = cartIds[i];
    const cartStartTime = Date.now(); // Track start time for this specific cart

    try {
      const data = await fetchCart(id);
      carts.push(data);

      const cartDuration = (Date.now() - cartStartTime) / 1000;
      console.log(`Cart ${id} loaded in ${cartDuration.toFixed(2)} seconds`);
    } catch (err) {
      carts.push({ error: err.message });

      const cartDuration = (Date.now() - cartStartTime) / 1000;
      console.log(`Cart ${id} failed after ${cartDuration.toFixed(2)} seconds`);
    }
  }

  const totalDuration = (Date.now() - totalStartTime) / 1000;
  console.log(`\nVersion A total time: ${totalDuration.toFixed(2)} seconds\n`);
  printReport(carts);
}

async function runVersionB() {
  console.log("Running Version B (Parallel) ");
  const startTime = Date.now();

  const cartIds = [1, 2, 3];

  // Start all fetch requests at the same time
  //[Promise <pending>, Promise <pending>, Promise <pending>]
  const promises = cartIds.map((id) =>
    fetchCart(id).catch((err) => ({ error: err.message })),
  );

  // Wait for all of them to finish together
  const carts = await Promise.all(promises);

  const duration = (Date.now() - startTime) / 1000;
  console.log(`Version B took: ${duration.toFixed(2)} seconds\n`);
  printReport(carts);
}

// timer that fails after 3 seconds
function timeoutAfter3Seconds(cartId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Cart ${cartId} timed out`));
    }, 3000);
  });
}

// slow request: waits 5 seconds, then loads the cart
async function fetchSlowCart(cartId) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return await fetchCart(cartId);
}

async function runVersionC() {
  console.log("Running Version C (3 second timeout)");
  const startTime = Date.now();

  const cartIds = [1, 2, 3];

  const promises = cartIds.map((id) => {
    let request;
    if (id === 2) {
      request = fetchSlowCart(id); // cart 2 is the slow one
    } else {
      request = fetchCart(id); // normal request
    }

    // Whoever finishes first wins: the request or the 3 second timer
    return Promise.race([request, timeoutAfter3Seconds(id)]).catch((err) => ({
      error: err.message,
    }));
  });

  const carts = await Promise.all(promises);

  const duration = (Date.now() - startTime) / 1000;
  console.log(`Version C took: ${duration.toFixed(2)} seconds\n`);
  printReport(carts);
}

runVersionA()
  .then(() => runVersionB())
  .then(() => runVersionC());
