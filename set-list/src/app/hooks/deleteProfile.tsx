import { auth } from "../../../firebase";
import { NextResponse } from "next/server";

const DeleteProfile = async (): Promise<NextResponse> => {
  const user = await auth.currentUser;
  if (!user) {
    return NextResponse.json(
        { message: "Could not delete profile", error: "User does not exist"},
        { status: 500 }
      );
  }
  try {
    await user.delete();
    return NextResponse.json(
        { message: "Successfully deleted profile" },
        { status: 200 }
      );
  }
  catch (error) {
    if (error instanceof Error) {
        return NextResponse.json(
          { message: "Could not delete profile", error: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Could not delete profile", error: "Unknown error" },
        { status: 500 }
      );
  }
}

export default DeleteProfile;
