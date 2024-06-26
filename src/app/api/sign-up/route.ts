import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST (request : Request) {
  await dbConnect

  try {
    const {username, email, password} = await request.json()
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true
    })

    if(existingUserVerifiedByUsername){
      return Response.json({
        
      })
    }

  } catch (error) {
    console.log("Error registering user", error) // for our terminal 
    return Response.json({  // for frontend
      success: false,
      message: "Error registering user"
    }, 
  {
    status: 500
  })
  }
}