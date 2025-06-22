import { JSX } from "react";
import User from "../dataTypes/user";

function UserCard({
  name,
  age,
  university,
  instruments,
  genre,
}: User): JSX.Element {
  return (
    <>
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="md:flex p-6">
          <div className="md:flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-blue-600 text-white text-3xl font-bold uppercase">
            {name.charAt(0)}
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {name}
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              <span className="font-medium">Age:</span> {age}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">University:</span> {university}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              <span className="font-medium">Instruments:</span>{" "}
              {instruments.length > 0 ? instruments.join(", ") : "None"}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              <span className="font-medium">Genres:</span>{" "}
              {genre.length > 0 ? genre.join(", ") : "None"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
