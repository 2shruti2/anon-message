import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";

const UserQuerySchema = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {

  await dbConnect();

  try {
    const { searchParams } = new URL(request.url); // to get url query parameters url/?username=
    const queryParam = {
      username: searchParams.get("username"),
    };

    // validate with zod
    const result = UserQuerySchema.safeParse(queryParam);
    console.log("result ", result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if(existingVerifiedUser){
      return Response.json(
        {
          success: false,
          message:"Username is already taken",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message:"Username is available",
      },
      {
        status: 200,
      }
    );


  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
