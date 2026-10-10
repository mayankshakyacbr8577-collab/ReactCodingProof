http = require("http");
url=require("url");
const main = (req, res) => {
  const urlPath=url.parse(req.url,true)
  const path=urlPath.pathname;
  if(path==="/"){
  res.writeHead(200,{"content-type":"text/html"})
  res.write("<h2>Welcome to Node JS</h2>");
  res.write("using Automatic updating app nodemon<br>");
  res.end("Starting on port:3000");
} else if (path==="/about"){
res.writeHead(200,{"content-type":"application/json"})
const info={
  name:"abc",
  address:"kiet"
}
  res.end(JSON.stringify(info))
} else if (req.method==="GET" && req.url.split("/")[1]==="product"){
  const pid=req.url.split("/")[2];
  res.writeHead(200,{"content-type":"text/html"})
    res.end("<h2>Product ID="+pid);

} else if (req.url.split("/")[1]==="product?pid=1"){
  const pid=urlPath.query.pid;
  res.writeHead(200,{"content-type":"text/html"})
    res.end("<h2>Product ID="+pid);

}
else {
   res.writeHead(404,{"content-type":"text/html"})
   res.end("<h2>Page not found!</h2>")
}
};
const server = http.createServer(main);
server.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Running app on this address:http://127.0.0.1:3000");
});
