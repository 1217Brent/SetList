import { JSX } from "react";
import EventProps from "../../dataTypes/eventProps";

function EventCard({
  name,
  image,
  description,
  location,
  time,
}: EventProps): JSX.Element {
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
            <img src={image} />
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {description}
            </p>
           
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {location}
            </p>{" "}
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {time}
            </p>
          </div>
        </div>
        <div>
          <button>Sign Up For Event!</button>
        </div>
      </div>
    </>
  );
}

export default EventCard;
