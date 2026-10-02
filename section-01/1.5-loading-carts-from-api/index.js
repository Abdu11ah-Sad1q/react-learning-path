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
  console.log("Running Version A ");
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

runVersionA();
