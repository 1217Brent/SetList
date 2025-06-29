// interface User {
//     id: string;
//     name: string;
//     email: string;
//     createdAt: string;
// }

// interface UnauthorizedError {
//     type: "unauthorized";
//     reason: string;
// }

// interface ValidationError{
//     type: "validation";
//     fields: Record<string, string>;
// }

// interface NotFoundError {
//     type: "not_found";
//     resource: string;
// }

// interface APIResponse<T> {
//     success: boolean;
//     message: string;
//     data?: T;
//     error?: ErrorType;
// }

// interface CreateUserProps {
//     name: string;
//     email: string;
// }

// type GetUserById = APIResponse<User>;
// type UpdateUser = APIResponse<User>;
// type CreateUser = APIResponse<User>;
// type DeleteUser = APIResponse<User>;
// type ErrorType = UnauthorizedError | ValidationError | NotFoundError;
// type inputUser = Omit<User , "id" | "createdAt">;

// const getUserById = async (id: string): Promise<GetUserById> => {
//     const response = await fetch("/api/backend/databaseforUsers/get/{id}", {
//         method: 'GET',
//         headers: {
//             'Content-Type': `application/json`,
//         }
//     })
//     const data = await response.json();
//     if (data) {
//         return {
//             success: true,
//             message: "successfully fetched user by id",
//             data: data,
//         }
//     } else {
//         return {
//             success: false,
//             message: "failed to fetch user with Id",
//             data: data,
//             error: data,
//         }
//     }
// }

// const createUser = async ({name, email}: CreateUserProps): Promise<CreateUser> => {
//     const newUserObject: inputUser = {
//         name: name,
//         email: email,
//     } 
//     const response = await fetch('/api/backend/databaseforUsers/create/{newUserObject}', { //assume it generates new id and createdAt
//         method: 'POST'
//     });
//     const data: User = await response.json();
//     if (response.status === 200) {
//         return {
//             success: true,
//             message: "Successfully created user",
//             data: data as User,
//         }
//     } else if (response.status === 404) {
//         return {
//             success: false,
//             message: "User not found",
//             error: {
//                 type: "not_found",
//                 resource: "user",
//             }
//         }
//     } else {
//         return {
//             success: false,
//             message: "unauthorized",
//             error: {
//                 type: "unauthorized",
//                 reason: "You are unauthorized,"
//             }
//         }
//     }
// }

// const updateUser = async (userObject: User): Promise<UpdateUser> => {
//     const response: Response = await fetch('/api/users/update/${userObject}', { // adds id and createdAt
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     const data: User = response.json();
//     if (data && response.status === 200) {
//         return {
//             success: true,
//             message: "successfully updated user",
//             data: data,
//         }
//     } else {
//         return {
//             success: false,
//             message: "failed to update user",
//             data: data,
//             error: {
//                 type: "unauthorized",
//                 reason: "authorized",
//             },
//         }
//     }
// }

// const deleteUserById = async (id: string): Promise<DeleteUser> => {
//     const response = await fetch('/api/users/delete/${id}', { // should delete the user associated 
//                                                               //with the input id and return the data that is deleted
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'applications/json',
//         }
//     });
//     const deletedUser: User = response.json();
//     if (deletedUser) { // if the user was deleted you don't need status === 200 because if it is 200 deletedUser should exist
//         return {
//             success: true,
//             message: "successfully deleted user",
//             data: deletedUser,
//         }
//     } else if (deletedUser === null) {
//         return {
//             success: false,
//             message: "user was not found",
//             data: deletedUser,
//             error: {
//                 type: "not_found",
//                 resource: "not_found",
//             },
//         }
//     } else { // or you can see if you can access the response object to see the error and adjust this return statement
//         return {
//             success: false,
//             message: "unauthorized",
//             data: deletedUser,
//             error: {
//                 type: "unauthorized",
//                 reason: "unauthorized",
//             },
//         }
//     }
// }