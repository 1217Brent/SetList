import { ChangeEvent, FormEvent, JSX } from "react";
import { useState } from "react";
import EventSignUpProps from "@/app/dataTypes/eventSignUps";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import APIResponse from "@/app/dataTypes/errorTypes";

type SubmitType = APIResponse<EventSignUpProps>;

function EventSignUp(): JSX.Element {
  const [inputFields, setInputFields] = useState<EventSignUpProps>({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkBox) {
      setCheckBox(false);
    } else {
      setCheckBox(true);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<SubmitType> => {
    //FormEvent is for event changes to a Form while ChangeEvent is a event change for Input Changes!
    e.preventDefault();
    if (checkBox) {
      const viewSignUpCollectionRef = collection(db, "ViewSignUps");
        try {
            await addDoc(viewSignUpCollectionRef, inputFields);
            return {
              success: true,
              message: "successfully added doc to View Sign Up Collection!",
              data: inputFields,
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Unable to add doc to firestore database collection",
                data: inputFields,
                error: {
                    type: "firebase_error",
                    reason: error?.message,
                    errorCode: error?.code, // this will show if it is auth or database error
                },
            }
        }
    } else {
      return {
        success: false,
        message: "User needs to click on the checkbox",
        data: inputFields,
        error: {
          type: "validation_error",
          fields: { checkboxRule: "User did not click the check box" },
        },
      };
    }
  };
  return (
    <>
      <div>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            value="name"
            name="name"
            id="1"
            onChange={handleChange}
          ></input>
          <input
            value="email"
            name="email"
            id="2"
            onChange={handleChange}
          ></input>
          <input
            value="phoneNumber"
            name="phoneNumber"
            id="3"
            onChange={handleChange}
          ></input>
          <div>
            <p>I agree to the terms and conditions to attend this event!</p>
            <input type="checkbox" onChange={onCheckBoxChange}></input>
          </div>
        </form>
      </div>
    </>
  );
}

export default EventSignUp;
