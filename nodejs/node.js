http =require("http")
fs=require("fs")
path=require("path")
const main=(req,res)=>{
  const urlPath=new URL(req.url,`http://${req.headers.host}`);
  const pathname=urlPath.pathname;
  const filename=urlPath.searchParams.get("fname");
  const content=urlPath.searchParams.get("content");
  const firDir=path.join(__dirname,files);
  console.log(firDir)
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