import  fs  from "fs"

// import data from "../data/database" ;
const data = require('../database/data')


type objFormat = {
    [organization : string] : string | string[] | number
}

function getAllData(){
    return new Promise((resolve, reject) =>{
        resolve(data)
    })
}

function getSingleData(id: number):Promise<objFormat>{
    return new Promise((resolve, reject) =>{
        const productById: objFormat = data.find((data: objFormat)  => Number(data.id) == id)
        if(!productById){
            return reject(`Todo with id${id}, was not found`);
        }
        resolve(productById)
    })
}


function deleteData(id: number){
    return new Promise((resolve, reject) => {
        const deleteById: objFormat = data.find((data: objFormat)  => Number(data.id) == id)

        if(!deleteById){
            return reject(`Todo with id${id}, was not found`);
        }
        let index = data.map((info: objFormat) => info.id).indexOf(id)
        data.splice(index,1);

        let json = JSON.stringify(data, null, " ")
        let writeStream = fs.createWriteStream("./database/data.json")
        writeStream.write(json)
        writeStream.end()
        resolve(`Todo with id of ${id} has been deleted`)
    })
}


function postData(organization: objFormat){
    return new Promise((resolve, reject) => {
        const newOrganization = { ...organization, id: data.length + 1 }
        data.push(newOrganization)
        let json = JSON.stringify(data, null, " ")
        let writeStream = fs.createWriteStream("./database/data.json")
        writeStream.write(json)
        resolve(newOrganization)
    })
}

function updateData(update:objFormat, id: number){
    return new Promise((resolve, reject) => {

        let index = data.findIndex((item: objFormat )=> item.id === id)

        data[index]={id, ...update}

        let json = JSON.stringify(data, null, " ")
        let writeStream = fs.createWriteStream("./database/data.json")
        writeStream.write(json)
        writeStream.end()

        resolve(data[index])
    })
}


export  {
    getAllData,
    getSingleData,
    deleteData,
    postData,
    updateData,
    objFormat
}
