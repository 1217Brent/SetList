"use client";

import { JSX, useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import User from "../dataTypes/user";
import UserCard from "./Auth/UserCard";
import EventProps from "../dataTypes/eventProps";
import EventCard from "./Events/EventCard";
import fetchUsers from "../hooks/fetchUsers";

type Users = User[];
type EventPropsList = EventProps[];

const everiteKey = process.env.API_EVERITE_KEY;
function HomePage(): JSX.Element {
  const [users, setUsers] = useState<Users>([]);
  const [errors, setErrors] = useState<string>("");
  const [events, setEvents] = useState<EventPropsList>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const userList: User[] = await fetchUsers();
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
        setErrors("Failed to load users.");
      }
    };

    fetchAllUsers();
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