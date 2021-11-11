// import { getAllData } from "../model/model";
import { getAllData, getSingleData, deleteData, postData,updateData, objFormat } from "./model"
import http, { IncomingMessage, Server, ServerResponse } from "http";
import { getReqData } from "./utils"

async function allData(request: IncomingMessage, response: ServerResponse){//check to confirm the data type of res and req
    try{
        let allInfo = await getAllData()
        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(allInfo))
    }catch(error){
        response.writeHead(404, { "Content-Type": "application/json" })
        response.end(JSON.stringify({message : error}))
    }

}

async function singleData(request: IncomingMessage, response: ServerResponse, id: number){//check t confirm the data type of res and req
    try{
        let singleInfo = await getSingleData(id);
        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(singleInfo))
    }catch(error){
        response.writeHead(404, { "Content-Type": "application/json" })
        response.end(JSON.stringify({message : error}))
    }
}

async function deleteDataById(request: IncomingMessage, response: ServerResponse, id: number){//check t confirm the data type of res and req
    try{
        let deletedInfo = await deleteData(id);
        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(deletedInfo))
    }catch(error){
        response.writeHead(404, { "Content-Type": "application/json" })
        response.end(JSON.stringify({message : error}))
    }
}

async function postNewData(request: IncomingMessage, response: ServerResponse){//check to confirm the data type of res and req
    try{
        const postedInfo: any = await getReqData(request);
        const {organization, products, marketValue, address, ceo, country, noOfEmployees, employees} = JSON.parse(postedInfo)

        //create organization
        const post: objFormat ={
          organization,
          cretaedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          products,
          marketValue,
          address,
          ceo,
          country,
          noOfEmployees,
          employees
        }
        console.log(post)
         const organizationData = await postData(post)
        console.log("returned: ", organizationData)

        response.writeHead(201, { "Content-Type": "application/json" })
       response.end(JSON.stringify(organizationData))
    }catch(error){
      console.log(error)
        response.writeHead(404, { "Content-Type": "application/json" })
        response.end(JSON.stringify({message : error}))
    }
}

async function updateDataById(request: IncomingMessage, response: ServerResponse, id: number){//check to confirm the data type of res and req
    try{
        const updatedInfo: any = await getReqData(request);
        let updatedObjData = await getSingleData(id);

        const {organization, products, marketValue, address, ceo, country, noOfEmployees, employees} = JSON.parse(updatedInfo)
        // console.log('postedInfo', updatedInfo)
        // console.log('post', update)
        //create organization
        const update = {
          createdAt: updatedObjData.createdAt,
          updatedAt: new Date().toISOString(),
          organization: organization || updatedObjData.organization,
          products: products || updatedObjData.products,
          marketValue: marketValue || updatedObjData.marketValue,
          address: address || updatedObjData.address,
          ceo: ceo || updatedObjData.ceo,
          country: country || updatedObjData.country,
          noOfEmployees: noOfEmployees || updatedObjData.noOfEmployees,
          employees: employees || updatedObjData.employees
         }
        const updatedData = await updateData(update, id)

        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(updatedData))
    }
    catch(error){
        response.writeHead(404, { "Content-Type": "application/json" })
        response.end(JSON.stringify({message : error}))
    }
}

export {
    allData,
    singleData,
    deleteDataById,
    postNewData,
    updateDataById
}
