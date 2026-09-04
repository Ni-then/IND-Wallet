"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import  {prisma} from "@repo/prisma-system/client"
export async function createOnRampTransaction(amount:number,provider:string){
    // Security concern : dont send the userId in props , who click on btn can send wrong userId or manipulate
    const session = await getServerSession(authOptions)
    // in real-life it will fetch 
    // const token = await axios.get("http://api/hdfcbacnk.com/getToken",{
    //     amount:{

    //     },
    //     userId,
    // })
    const token = Math.random().toString()
    const userId = session?.user?.id;
    if(!userId){
        return{
            message:"User is not loggedin!"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            userId:Number(userId),
            amount:Number(amount),
            status:"Processing",
            startTime:new Date(),
            provider,
            token,
        }
    })
    console.log("Done")
    return {
        message:"OnRamp transaction created successfully",
        token
    }

}