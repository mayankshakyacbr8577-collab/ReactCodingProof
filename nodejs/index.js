http =require("http")
fs=require("fs")
const main=(req,res)=>{
  const urlPath=new URL(req.url,`http://${req.headers.host}`);
  if(urlPath.pathname==="/readfile"){
    fs.readFile("index.js","utf8",(error,data)=>{
        if(error){
            console.log(error)
        }
        res.writeHead(200,{"content-type":"text/html"})
        res.end("<pre>"+data+"</pre>")
    })
  }
}
const server=http.createServer(main);
server.listen(3000,(error)=>{
    if(error){
        console.log(error)
    }
    console.log("Running on http://127.0.0.1:3000")
})