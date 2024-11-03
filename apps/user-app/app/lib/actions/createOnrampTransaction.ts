"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    // ideally the token should come from the banking provider with password ki it has been sent by bank only (hdfc/axis)
    const session = await getServerSession(authOptions) 
    if(!session?.user || !session.user?.id) {
            return {
                msg: "Unauthenticated request"
            }
    }

    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data:{
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });
    
    return {
        msg: "Done"
    }

    
    
}