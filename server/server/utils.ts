function getReqData(req: any){
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk: string) => {
              // append the string version to the body
                body += chunk.toString();
            })
             // listen till the end
            req.on("end", () => {
              // send back the data
                resolve(body);
            })
        }catch(error){
            reject(error)
        }
    })
}

export {
    getReqData
}
