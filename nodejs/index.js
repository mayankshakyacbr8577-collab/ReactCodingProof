const http = require("http");
const url = require("url");
const router = require("./routes/myroutes");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(router);
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

  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Parse request body
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    let parsedBody = {};

    if (body) {
      try {
        parsedBody = JSON.parse(body);
      } catch (error) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Invalid JSON"
          })
        );
      }
    }

    // =========================
    // ROOT
    // =========================

    if (path === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });

      res.end(`
        <h2>Welcome to Node.js CRUD API</h2>

        <h3>Available Endpoints:</h3>

        GET /products<br>
        GET /products/:id<br>
        POST /products<br>
        PUT /products/:id<br>
        DELETE /products/:id<br>
      `);
    }

    // =========================
    // ABOUT
    // =========================

    else if (path === "/about") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify({
          name: "Node CRUD API",
          version: "1.0"
        })
      );
    }

    // =========================
    // GET ALL PRODUCTS
    // =========================

    else if (method === "GET" && path === "/products") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(products));
    }

    // =========================
    // GET PRODUCT BY ID
    // =========================

    else if (
      method === "GET" &&
      path.startsWith("/products/")
    ) {
      const id = parseInt(path.split("/")[2]);

      if (isNaN(id)) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Invalid product ID"
          })
        );
      }

      const product = products.find(
        (p) => p.id === id
      );

      if (!product) {
        res.writeHead(404, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Product not found"
          })
        );
      }

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(product));
    }

    // =========================
    // POST - ADD PRODUCT
    // =========================

    else if (
      method === "POST" &&
      path === "/products"
    ) {
      // Validation
      if (
        !parsedBody.name ||
        parsedBody.price === undefined
      ) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Name and price are required"
          })
        );
      }

      if (typeof parsedBody.price !== "number") {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Price must be a number"
          })
        );
      }

      const newProduct = {
        id:
          products.length > 0
            ? Math.max(
                ...products.map((p) => p.id)
              ) + 1
            : 1,

        name: parsedBody.name,
        price: parsedBody.price
      };

      products.push(newProduct);

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify({
          message: "Product added successfully",
          product: newProduct
        })
      );
    }

    // =========================
    // PUT - UPDATE PRODUCT
    // =========================

    else if (
      method === "PUT" &&
      path.startsWith("/products/")
    ) {
      const id = parseInt(path.split("/")[2]);

      if (isNaN(id)) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Invalid product ID"
          })
        );
      }

      const productIndex = products.findIndex(
        (p) => p.id === id
      );

      if (productIndex === -1) {
        res.writeHead(404, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Product not found"
          })
        );
      }

      // Update only provided fields
      if (parsedBody.name !== undefined) {
        products[productIndex].name =
          parsedBody.name;
      }

      if (parsedBody.price !== undefined) {
        if (typeof parsedBody.price !== "number") {
          res.writeHead(400, {
            "Content-Type": "application/json"
          });

          return res.end(
            JSON.stringify({
              error: "Price must be a number"
            })
          );
        }

        products[productIndex].price =
          parsedBody.price;
      }

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify({
          message: "Product updated successfully",
          product: products[productIndex]
        })
      );
    }

    // =========================
    // DELETE PRODUCT
    // =========================

    else if (
      method === "DELETE" &&
      path.startsWith("/products/")
    ) {
      const id = parseInt(path.split("/")[2]);

      if (isNaN(id)) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Invalid product ID"
          })
        );
      }

      const productIndex = products.findIndex(
        (p) => p.id === id
      );

      if (productIndex === -1) {
        res.writeHead(404, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            error: "Product not found"
          })
        );
      }

      const deletedProduct =
        products.splice(productIndex, 1)[0];

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify({
          message: "Product deleted successfully",
          product: deletedProduct
        })
      );
    }

    // =========================
    // 404
    // =========================

    else {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify({
          error: "Route not found"
        })
      );
    }
  });
};

// Create server
const server = http.createServer(main);

// Start server
server.listen(3000, () => {
  console.log(
    "Server running at http://localhost:3000"
  );
});