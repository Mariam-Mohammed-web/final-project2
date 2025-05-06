import app from "./app";
import http from "http";
const PORT = process.env.PORT ||3000
const server = http.createServer(app)
server.listen(PORT,function(){
    console.log("server is running on http://localhost:"+PORT)
})
server.on("error",function(err:Error){
    console.error("the server has failed to start:",err)
    process.exit(1)
})