import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { IUser, IUserExisting } from "../interfaces/user.interface"

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async createUser(data: IUser) {
        return await this.userRepository.save(data);
    }

    async findOneUser(id: number) {
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async removeUser(data: IUserExisting) {
        return await this.userRepository.remove(data);
    }
    // await this.userRepository.remove(userToRemove)
}
