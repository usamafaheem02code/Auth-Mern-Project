import {toast} from "react-toastify"


const successToast = (msg)=>{
    toast.success(msg,{
        position:"top-right"
    })
}

const failedToast = (msg)=>{
    toast.error(msg,{
        position:"top-right"
    })
}


export {successToast,failedToast}