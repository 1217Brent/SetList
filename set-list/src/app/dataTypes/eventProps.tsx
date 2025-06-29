import { Timestamp } from "firebase/firestore";

export default interface EventProps {
    name: string;
    image: string;
    description: string;
    location: string;
    time: string; // change this to time later
}