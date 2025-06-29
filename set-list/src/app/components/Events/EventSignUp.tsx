import { ChangeEvent, JSX } from "react";
import { useState } from "react";
import EventSignUpProps from "@/app/dataTypes/eventSignUps";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";

function EventSignUp(): JSX.Element {
    const [inputFields, setInputFields] = useState<EventSignUpProps>({
        name: "",
        email: "",
        phoneNumber:"",
    })
    const [error, setError] = useState("");
    const [checkBox, setCheckBox] = useState(false);
    const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (checkBox) {
            setCheckBox(false);
        } else {
            setCheckBox(true);
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }))
    }
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkBox) {
            try {
                const viewSignUpCollectionRef = collection(db, "ViewSignUps");
                await addDoc(viewSignUpCollectionRef, inputFields);
            } catch (err){
                console.error("Failed to add document to firestore database");
                setError(err);
            }
        } else {
            console.error("Failed to add data to the firestore database");
        }
    }
    return (
        <>
        <div>
            {error && (<div>{error}</div>)}
            <form onSubmit={handleSubmit}>
                <input value="name" name="name" id="1" onChange={handleChange}></input>
                <input value="email" name="email" id="2" onChange={handleChange}></input>
                <input value="phoneNumber" name="phoneNumber" id="3" onChange={handleChange}></input>
                <div>
                    <p>I agree to the terms and conditions to attend this event!</p>
                    <input type="checkbox" onChange={onCheckBoxChange}></input>
                </div>
            </form>
        </div>
        </>
    )
}

export default EventSignUp;
