export interface IUser {
    firstName: string;
    lastName: string;
    age: number;
}

export interface IUserExisting {
    id: number;
    firstName: string;
    lastName: string;
    age: number
}
  
// export interface IUserMethods {
// matchPassword(password: string): Promise<boolean>;
// }