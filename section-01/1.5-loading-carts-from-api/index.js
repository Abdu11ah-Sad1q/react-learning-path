async function versionA() {

  console.time("Cart 1 Data Loading");
  const response = await fetch("https://dummyjson.com/carts/1");
  const data = await response.json();
  console.log("Cart 1:", data);
  console.timeEnd("Cart 1 Data Loaded");
  console.log("Total Price Cart 1: ", data.total);


  console.time("Cart 2 Data Loading");
  response = await fetch("https://dummyjson.com/carts/2");
  data = await response.json();
  console.timeEnd("Cart 2 Data Loaded");
  console.log("Total Price Cart 2: ", data.total);




  console.time("Cart 3 Data Loading");
  response = await fetch("https://dummyjson.com/carts/3");
  data = await response.json();
  console.timeEnd("Cart 3 Data Loaded");
  console.log("Total Price Cart 3: ", data.total);
  
}


versionA();


