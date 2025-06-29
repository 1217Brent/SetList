import { FormEvent, JSX } from "react";
import User from "@/app/dataTypes/user";
import { useState } from "react";
import { ChangeEvent } from "react";
import UserProps from "@/app/dataTypes/userProps";

function EditProfile({name, age, university, instruments, genre, email}: UserProps): JSX.Element {
    type Input = Omit<User, "id">;
    type InputProps = Input & {email: string};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [inputFields, setInputFields] = useState<InputProps>({
        name: name,
        age: age,
        email: email,
        university: university,
        instruments: instruments,
        genre: genre,
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputFields((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }
        ));
        if (error) setError("");
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {

        } catch {

        } finally {
            setLoading(false);
        }
    }
    return (
        <>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Editting Profile....." : "Edit Profile"}
          </button>
        </form>
      </div>
    </div>
        </>
    )
}

export default EditProfile;