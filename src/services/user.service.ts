import { riseConsts } from "../config/constants.config";
import { AppDataSource } from "../data-source";
import { User } from "../entitys/user.entity";
import { IUser, IUserExisting } from "../interfaces/user.interface"


export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    getAllUsers = async () => {
        return await this.userRepository.find();
    }

    async createUser(data: Partial<IUser>) {
        return await this.userRepository.save(data);
    }

    async findOneUser(id: number) {
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async login (input: Pick<IUser, 'name' | 'password'>) {
        const { name, password } = input;
        console.log(name)
        
        const user = await this.userRepository.findOne({where: { name }});
        if (!user) throw new Error(riseConsts.MESSAGES.USER.INVALID_ID_ERROR);
      
        if (!user.validatePassword(password)) {
          throw new Error(riseConsts.MESSAGES.USER.INVALID_ID_ERROR);
        }

        return user;
      };

    async findByName(name: string) {
        return await this.userRepository.findOne({
            where: { name }
        });
    }

    async removeUser(data: any) {
        return await this.userRepository.remove(data);
    }
    // await this.userRepository.remove(userToRemove)
}
