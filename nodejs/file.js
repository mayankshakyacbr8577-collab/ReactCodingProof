http = require("http");
url = require("url");

// In-memory data store
let products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 }
];

const main = (req, res) => {
  const urlPath = url.parse(req.url, true);
  const path = urlPath.pathname;
  const method = req.method;

  // Helper function to parse request body
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let parsedBody = {};
    if (body) {
      try {
        parsedBody = JSON.parse(body);
      } catch (e) {
        parsedBody = {};
      }
    }

    // Root endpoint
    if (path === "/") {
      res.writeHead(200, { "content-type": "text/html" });
      res.write("<h2>Welcome to Node JS CRUD API</h2>");
      res.write("Endpoints:<br>");
      res.write("GET /products - Get all products<br>");
      res.write("GET /products/:id - Get product by ID<br>");
      res.write("POST /products - Add new product<br>");
      res.write("PUT /products/:id - Update product<br>");
      res.write("DELETE /products/:id - Delete product<br>");
      res.end("Running on port: 3000");
    }
    // About endpoint
    else if (path === "/about") {
      res.writeHead(200, { "content-type": "application/json" });
      const info = {
        name: "Node CRUD API",
        version: "1.0"
      };
      res.end(JSON.stringify(info));
    }
    // GET all products
    else if (method === "GET" && path === "/products") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(products));
    }
    // GET product by ID
    else if (method === "GET" && path.startsWith("/products/")) {
      const id = parseInt(path.split("/")[2]);
      const product = products.find(p => p.id === id);
      if (product) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(product));
      } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Product not found" }));
      }
    }
    // POST - Add new product
    else if (method === "POST" && path === "/products") {
      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: parsedBody.name,
        price: parsedBody.price
      };
      products.push(newProduct);
      res.writeHead(201, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Product added successfully", product: newProduct }));
    }
    // PUT - Update product
    else if (method === "PUT" && path.startsWith("/products/")) {
      const id = parseInt(path.split("/")[2]);
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          name: parsedBody.name || products[productIndex].name,
          price: parsedBody.price || products[productIndex].price
        };
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product updated successfully", product: products[productIndex] }));
      } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Product not found" }));
      }
    }
    // DELETE - Delete product
    else if (method === "DELETE" && path.startsWith("/products/")) {
      const id = parseInt(path.split("/")[2]);
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1)[0];
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product deleted successfully", product: deletedProduct }));
      } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Product not found" }));
      }
    }
    // 404 - Page not found
    else {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("<h2>Page not found!</h2>");
    }
  });
};

const server = http.createServer(main);
server.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Running app on this address: http://127.0.0.1:3000");
});
