import { auth } from "../../../firebase";

function DeleteProfile() {
    const user = auth.currentUser;
    user?.delete()
        .then(() => {
            console.log("Successfully deleted user!");
        })
        .catch((error: any) => {
            console.error("An error has appeared", error);
        });
}

export default DeleteProfile;