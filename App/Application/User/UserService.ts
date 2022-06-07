import CreateUserDTO from "./CreateUserDTO";
import {IUserRepository, IUserRepositoryId} from "../../Domain/Entities/User/UserRepositoryInterface";
import {inject, injectable} from "inversify";
import FetchAllUserDTO from "./FetchAllUserDTO";
import UpdateUserDTO from "./UpdateUserDTO";
import IResponseMessage from "../Utils/IResponseMessage";
import IResponseData from "../Utils/IResponseData";
import FetchUserByIdDTO from "./FetchUserByIdDTO";
import UserEntity from "../../Domain/Entities/User/UserEntity";
import PaginationData from "../../Infrastructure/Utils/PaginationData";

@injectable()
class UserService {
  constructor(
    @inject(IUserRepositoryId) private userRepository: IUserRepository) {
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<IResponseMessage> {
    createUserDTO.hasAccess();
    const user: UserEntity = createUserDTO.user;
    await this.userRepository.addUser(user);
    return {status: "success", message: "User created successfully"}
  }

  async fetchAllUser(fetchAllUserDTO: FetchAllUserDTO): Promise<IResponseData> {
    const {paginationOptions, search} = fetchAllUserDTO;
    fetchAllUserDTO.hasAccess();
    const response: PaginationData = await this.userRepository.fetchAllUser({paginationOptions, search});
    return {status: "success", data: response.getPaginatedData()}
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<IResponseMessage> {
    updateUserDTO.hasAccess();
    const user: UserEntity = updateUserDTO.user;
    await this.userRepository.update(user.toObject());
    return {status: "success", message: "User updated successfully"}
  }

  async fetchUserById(fetchUserByIdDTO: FetchUserByIdDTO): Promise<any> {
    const {userId} = fetchUserByIdDTO;
    fetchUserByIdDTO.hasAccess();
    const response: UserEntity = await this.userRepository.fetchById(userId);
    return {status: "success", data: response}
  }
}

export default UserService


