import ProfileService from "../../../../../Application/Profile/ProfileService";
import CreateProfileDTO from "../../../../../Application/Profile/CreateProfileDTO";
import {injectable} from "inversify";
import FetchAllProfileDTO from "../../../../../Application/Profile/FetchAllProfileDTO";
import UpdateProfileDTO from "../../../../../Application/Profile/UpdateProfileDTO";
import FetchProfileByIdDTO from "../../../../../Application/Profile/FetchProfileByIdDTO";

@injectable()
class ProfileController {

  constructor(private ProfileService: ProfileService) {
  }

  createProfile = async (request) => {
    const input = new CreateProfileDTO(request);
    return await this.ProfileService.createProfile(input);
  }

  fetchAllProfile = async (request) => {
    const input = new FetchAllProfileDTO(request);
    return await this.ProfileService.fetchAllProfile(input);
  }

  updateProfile = async (request) => {
    const input = new UpdateProfileDTO(request);
    return await this.ProfileService.updateProfile(input)
}
  fetchProfileById = async (request) => {
    const input = new FetchProfileByIdDTO(request);
    return await this.ProfileService.fetchProfileById(input);
  }

}

export default ProfileController