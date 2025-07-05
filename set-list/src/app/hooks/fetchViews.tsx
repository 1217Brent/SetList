import { db } from "../../../firebase";
import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import EventSignUpProps from "../dataTypes/eventSignUps";
import { NextResponse } from "next/server";

const fetchViews = async (): Promise<EventSignUpProps[] | NextResponse> => {
  try {
    const viewCollection = collection(db, "ViewSignUps");
    const querySnapShot = await getDocs(viewCollection);
    const allSignUps: EventSignUpProps[] = querySnapShot.docs.filter(
      (doc: QueryDocumentSnapshot<DocumentData>) =>
        doc.data().type === "EventSignUpProps"
    ).map((document: QueryDocumentSnapshot<DocumentData>) => document.data() as EventSignUpProps);
    return allSignUps;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Can not fetch all sign ups", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Can not fetch all sign ups", error: "Unknown" },
      { status: 500 }
    );
  }
};

export default fetchViews;
