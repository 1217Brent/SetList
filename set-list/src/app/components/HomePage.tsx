"use client";

import { JSX, useEffect, useState } from "react";
import app from "../../../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import User from "../dataTypes/user";
import UserCard from "./Auth/UserCard";
import EventProps from "../dataTypes/eventProps";
import EventCard from "./Events/EventCard";

type Users = User[];
type EventPropsList = EventProps[];
function HomePage(): JSX.Element {
  const [users, setUsers] = useState<Users>([]);
  const [errors, setErrors] = useState<string>("");
  const [events, setEvents] = useState<EventPropsList>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollectionRef = collection(db, "User");
        const querySnapshot = await getDocs(userCollectionRef);
        //map returns a new array while forEach does not
        //you usually use map to transform data while forEach is undefined at the end
        const userList: Users = querySnapshot.docs.map(
          (document: QueryDocumentSnapshot<DocumentData>) => ({
            ...(document.data() as User), // this spread operater is spreading the data in each iteration so in each map a new document.data() gets added into the spread of data
          })
        );
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
        setErrors("Failed to load users.");
      }
    };

    fetchUsers();
  }, [db]); // include db as a dependency

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventCollectionRef = collection(db, "Event");
        const querySnapshot = await getDocs(eventCollectionRef);
        const eventList: EventPropsList = querySnapshot.docs.map(
          (document: QueryDocumentSnapshot<DocumentData>) => ({
            ...(document.data() as EventProps),
          })
        );
        setEvents(eventList);
      } catch (err) {
        console.error("Error fetching events", err);
        setErrors("failed to load events");
      }
    };
    fetchEvents();
  }, [db]);

  return (
    <div className="p-4">
      {errors && <p className="text-red-500">{errors}</p>}
      {users.map((user, index) => (
        <UserCard
          key={index}
          name={user.name}
          age={user.age}
          university={user.university}
          instruments={user.instruments}
          genre={user.genre}
          id={""}
        />
      ))}
      {events.map((event, index) => (
        <EventCard
          key={index}
          name={event.name}
          location={event.location}
          description={event.description}
          image={event.image}
          time={event.time}
        />
      ))}
    </div>
  );
}

export default HomePage;