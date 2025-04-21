import { toast } from "react-toastify";

export const handleSuccess=(msg)=>{
      toast.success(msg,{
          position:"top-center"
      })
}

export const handleError=(msg)=>{
      toast.error(msg,{
          position:"top-center"
      })
}

