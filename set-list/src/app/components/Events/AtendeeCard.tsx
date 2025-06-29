import EventSignUpProps from "@/app/dataTypes/eventSignUps";
import { JSX } from "react";

// add check boxes in each card
function AtendeeCard({name, email, phoneNumber}: EventSignUpProps): JSX.Element {
    return (
        <>
        <div>
            <h3>{name}</h3>
            <h3>{email}</h3>
            <h3>{phoneNumber}</h3>
        </div>
        </>
    )
}
export default AtendeeCard;