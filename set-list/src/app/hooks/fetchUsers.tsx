import { collection, DocumentData, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import User from "../dataTypes/user";
import { db } from "../../../firebase";
import { getFirestore } from "firebase/firestore";

const fetchUsers = async (): Promise<User[]> => {
    const userCollectionRef = collection(db, "User");
    const querySnapshot = await getDocs(userCollectionRef);
    const userList: User[] = querySnapshot.docs.map(
      (document: QueryDocumentSnapshot<DocumentData>) => ({
        ...(document.data() as User), // this spread operater is spreading the data in each iteration so in each map a new document.data() gets added into the spread of data
      })
    );
    return userList as User[];
}

export default fetchUsers;