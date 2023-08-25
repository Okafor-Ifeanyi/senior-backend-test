export interface IUser {
    name: string;
    password: string;
    age: number;
}

export interface IUserExisting {
    id: number;
    name: string;
    password: string;
    age: number;
}
  
// export interface IUserMethods {
// matchPassword(password: string): Promise<boolean>;
// }