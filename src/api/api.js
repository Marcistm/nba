import axios from "axios";



export function del(id,index,table,data){
    if (id!==undefined){
        let path='http://127.0.0.1:6325/delete'
        let params={
            id:id,
            table:table,
        }
        axios.get(path,{params:params}).then(res=>{
        })
    }
    data.splice(index, 1)
}

export function save(row,table){
        let path='http://127.0.0.1:6325/save'
        let params={
            row:row,
            table:table,
        }
        axios.post(path,params).then(res=>{
        })
}

