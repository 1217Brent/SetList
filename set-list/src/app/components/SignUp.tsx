"use client";

import { ChangeEvent, JSX } from "react";
import User from "../dataTypes/user";
import { useState } from "react";
import auth from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp(): JSX.Element {
  type Fields = User & { password: string, email: string};
  type Input = Omit<Fields, "id">;
//   type TestingOmit = Omit<Input, "name">

  const [inputFields, setInputFields] = useState<Input>({
    name: "",
    email: "",
    age: "",
    university: "",
    instruments: [],
    genre: [],
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields((prevValues) => ({
      ...prevValues,
      [name]: value, // When we want to set a property of an object equal to something, we put [] around that property
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");
    try {
        await createUserWithEmailAndPassword(auth, inputFields.email, inputFields.password) 
        .then((result) => {
            console.log(result);
            //navigate them to home page
        })
        .catch((error) => {
            console.error("Error SignUp.tsx");
            setError(error);
        })
    } catch {
        console.error("failed signing up");
    }
  }

  return (
    <>
      {/* This is an example component */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit = {handleSubmit} className="space-y-6" action="#">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign up to our platform
            </h3>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={inputFields.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              {error && <div>{error}</div>}
            </div>
                        {/* Name */}
                        <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={inputFields.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              {error && <div>{error}</div>}
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={inputFields.age}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              {error && <div>{error}</div>}
            </div>

            {/* University */}
            <div>
              <label
                htmlFor="university"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                University
              </label>
              <input
                type="text"
                name="university"
                id="university"
                value={inputFields.university}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              {error && <div>{error}</div>}
            </div>

            {/* Instruments */}
            <div>
              <label
                htmlFor="instruments"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Instruments (comma-separated)
              </label>
              <input
                type="text"
                name="instruments"
                id="instruments"
                value={inputFields.instruments.join(", ")}
                onChange={(e) =>
                  setInputFields((prev) => ({
                    ...prev,
                    instruments: e.target.value.split(",").map((i) => i.trim()),
                  }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
              {error && <div>{error}</div>}
            </div>

            {/* Genre */}
            <div>
              <label
                htmlFor="genre"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Genre (comma-separated)
              </label>
              <input
                type="text"
                name="genre"
                id="genre"
                value={inputFields.genre.join(", ")}
                onChange={(e) =>
                  setInputFields((prev) => ({
                    ...prev,
                    genre: e.target.value.split(",").map((g) => g.trim()),
                  }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
              {error && <div>{error}</div>}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={inputFields.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              {error && <div>{error}</div>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
      font-medium rounded-lg text-sm px-5 py-2.5 text-center 
      dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
          </form>
        </div>

        <p className="mt-5">
          This card component is part of a larger, open-source library of
          Tailwind CSS components. Learn more by going to the official{" "}
          <a
            className="text-blue-600 hover:underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flowbite Documentation
          </a>
          .
        </p>
      </div>
    </>
  );
}

export default SignUp;
