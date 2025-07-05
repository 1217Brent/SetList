import { JSX } from "react";
import { useEffect } from "react";
import { DocumentData, getFirestore, QuerySnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { collection } from "firebase/firestore";
import { useState } from "react";
import { getDocs } from "firebase/firestore";
import EventSignUpProps from "@/app/dataTypes/eventSignUps";
import AtendeeCard from "./AtendeeCard";

type EventSignUpPropsList = EventSignUpProps[];
function ViewSignUps(): JSX.Element {
    const [allSignUps, setAllSignUps] = useState<EventSignUpPropsList>([]);
    function sendMessage = () => { // add checkboxes in each ViewSignUpCard
        
    }
    useEffect(() => {
        const fetchViews = async () => {
            const viewSignUpCollection = collection(db, "ViewSignUps");
            const querySnapShot = await getDocs(viewSignUpCollection);
            const signUpsList: EventSignUpPropsList = querySnapShot.docs.map((document: QuerySnapshot<DocumentData>) => ({
                ...(document as unknown as EventSignUpProps),
            }));
            setAllSignUps(signUpsList);
        };
        fetchViews();
    },[db]);
    return (
        <>
        <div>
            {allSignUps.map((signup, index) => {
                <AtendeeCard key={index} name={signup.name} email={signup.email} phoneNumber={signup.phoneNumber} />
            })}
        </div>
        <button onClick={sendMessage}>Message Selected Atendees!</button>
        </>
    )
}

export default ViewSignUps;