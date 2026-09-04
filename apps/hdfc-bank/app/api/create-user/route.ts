import { prisma } from "@repo/prisma-system/client";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const data = await req.json();
    if(!data){
        return new Error("Oops,something went wrong , please try again later!")
    }
    console.log(data)
    const {mobileNumber,userId,password} = data;
    const isUserExist = await prisma.hdfcAccount.findFirst({
        where:{
            mobileNumber:mobileNumber
        }
    })
    if(isUserExist){
        return NextResponse.json({
            message: "User is already exist , please login!"
        })
    }
    const gen_balance = Math.floor(Math.random() * 10001);
    const createUser = await prisma.hdfcAccount.create({
        data:{
            mobileNumber:mobileNumber,
            password:password,
            userId:userId,
            balance:gen_balance,
        }
    })
    return NextResponse.json({
        message: "User created successfully",
        user:createUser
    })


}

