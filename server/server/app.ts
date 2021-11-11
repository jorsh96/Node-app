import http, { IncomingMessage, Server, ServerResponse } from "http";
import  { allData, singleData, deleteDataById , postNewData, updateDataById } from "./controller";
/*
implement your server code here
*/


const server: Server = http.createServer((req: IncomingMessage , res: ServerResponse) => {
  let newmatch = req.url as string
    if (req.url === "/api/organization" && req.method === "GET") {
      allData(req, res)
      // res.end(JSON.stringify({ name: "hello" }));
    }else if(newmatch.match(/\/api\/organization\/([0-9]+)/) && req.method === "GET"){
      const id = Number(newmatch.split("/").pop()) //api/product/1
      singleData(req, res, id)
    }else if(newmatch.match(/\/api\/organization\/([0-9]+)/) && req.method === "DELETE"){
      const id = Number(newmatch.split("/").pop()) //api/product/1
      deleteDataById(req, res, id)
    }else if(req.url === "/api/organization" && req.method === "POST"){
      console.log("post is working")
      postNewData(req, res)
    }else if(newmatch.match(/\/api\/organization\/([0-9]+)/) && req.method === "PUT"){
      const id = Number(newmatch.split("/").pop()) //api/product/1
      updateDataById(req, res, id)
    } else {
      res.writeHead(404,{'Content-type': 'app/json'})
      res.end(JSON.stringify({message: "Page Not Found"}))
    }
  }
);

server.listen(3005);

