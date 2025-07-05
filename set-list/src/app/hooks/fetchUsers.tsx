import {
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import User from "../dataTypes/user";
import { db } from "../../../firebase";
import { NextResponse } from "next/server";

const fetchUsers = async (): Promise<User[] | NextResponse> => {
  try {
    const userCollectionRef = collection(db, "User");
    const querySnapshot = await getDocs(userCollectionRef);
    const userList: User[] = querySnapshot.docs
      .filter(
        (document: QueryDocumentSnapshot<DocumentData>) =>
          document.data().type === "Users"
      )
      .map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        ...(doc.data() as User),
      }));
    return userList;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({message: "Failed to fetch users", error: error.message}, { status: 500 })
    }
    return NextResponse.json({message: "Failed to fetch users", error: "Unknown"}, { status: 500 })
  }
};

export default fetchUsers;
