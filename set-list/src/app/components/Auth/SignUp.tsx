"use client";

import { ChangeEvent, JSX, FormEvent } from "react";
import User from "@/app/dataTypes/user";
import { useState } from "react";
import { db, auth } from "../../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import APIResponse from "@/app/dataTypes/errorTypes";

function SignUp(): JSX.Element {
  type Fields = User & { password: string, email: string};
  type Input = Omit<Fields, "id">;
  type UserType = APIResponse<Input>;
  
  const router = useRouter();
  
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<UserType> => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(auth);
    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        inputFields.email, 
        inputFields.password
      );
      
      console.log("User created:", userCredential.user);
  
      await setDoc(doc(db, "User", userCredential.user.uid), {
        name: inputFields.name,
        age: inputFields.age,
        university: inputFields.university,
        genre: inputFields.genre, 
        instruments: inputFields.instruments,
      });
      
      return {
        success: true,
        message: "successfully created a user!",
        data: inputFields,
      }

      
    } catch (error: any) {
      console.error("Error during sign up:", error);
      setError(error.message || "Failed to create account");
      return {
        success: false,
        message: "could not add document to the firestore database",
        data: inputFields,
        error: {
          type: "firebase_error",
          reason: error?.message,
          errorCode: error?.code,
        }
      }
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mx-auto p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to our platform
          </h3>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

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
              disabled={loading}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={inputFields.email}
              onChange={handleChange}
              disabled={loading}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
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
              disabled={loading}
              min="1"
              max="120"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
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
              disabled={loading}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
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
                  instruments: e.target.value.split(",").map((i) => i.trim()).filter(i => i !== ""),
                }))
              }
              disabled={loading}
              placeholder="e.g., Guitar, Piano, Drums"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
            />
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
                  genre: e.target.value.split(",").map((g) => g.trim()).filter(g => g !== ""),
                }))
              }
              disabled={loading}
              placeholder="e.g., Rock, Jazz, Classical"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
            />
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
              disabled={loading}
              minLength={6}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;