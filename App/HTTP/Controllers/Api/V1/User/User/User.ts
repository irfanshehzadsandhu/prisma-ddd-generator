import UserService from "../../../../../Application/User/UserService";
import CreateUserDTO from "../../../../../Application/User/CreateUserDTO";
import {injectable} from "inversify";
import FetchAllUserDTO from "../../../../../Application/User/FetchAllUserDTO";
import UpdateUserDTO from "../../../../../Application/User/UpdateUserDTO";
import FetchUserByIdDTO from "../../../../../Application/User/FetchUserByIdDTO";

@injectable()
class UserController {

  constructor(private UserService: UserService) {
  }

  createUser = async (request) => {
    const input = new CreateUserDTO(request);
    return await this.UserService.createUser(input);
  }

  fetchAllUser = async (request) => {
    const input = new FetchAllUserDTO(request);
    return await this.UserService.fetchAllUser(input);
  }

  updateUser = async (request) => {
    const input = new UpdateUserDTO(request);
    return await this.UserService.updateUser(input)
}
  fetchUserById = async (request) => {
    const input = new FetchUserByIdDTO(request);
    return await this.UserService.fetchUserById(input);
  }

}

export default UserController