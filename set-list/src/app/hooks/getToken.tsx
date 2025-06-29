import { getIdToken } from "firebase/auth"
import { auth } from "../../../firebase";
import APIResponse from "../dataTypes/errorTypes";

type FunctionResponse = APIResponse<string>;
const getToken = async (): Promise<FunctionResponse> => {
    if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser);
        return {
            success: true,
            message: "Token successfully fetched",
            data: token,
        }
    } else {
        return {
            success: false,
            message: "there is no user logged in or you do not have authorization to access current user",
            error: {
                type: "unauthorized",
                reason: "You are unauthorized",
            }

        }
    }
}

export default getToken;