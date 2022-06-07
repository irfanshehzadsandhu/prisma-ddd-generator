import CreateProfileDTO from "./CreateProfileDTO";
import {IProfileRepository, IProfileRepositoryId} from "../../Domain/Entities/Profile/ProfileRepositoryInterface";
import {inject, injectable} from "inversify";
import FetchAllProfileDTO from "./FetchAllProfileDTO";
import UpdateProfileDTO from "./UpdateProfileDTO";
import IResponseMessage from "../Utils/IResponseMessage";
import IResponseData from "../Utils/IResponseData";
import FetchProfileByIdDTO from "./FetchProfileByIdDTO";
import ProfileEntity from "../../Domain/Entities/Profile/ProfileEntity";
import PaginationData from "../../Infrastructure/Utils/PaginationData";

@injectable()
class ProfileService {
  constructor(
    @inject(IProfileRepositoryId) private profileRepository: IProfileRepository) {
  }

  async createProfile(createProfileDTO: CreateProfileDTO): Promise<IResponseMessage> {
    createProfileDTO.hasAccess();
    const profile: ProfileEntity = createProfileDTO.profile;
    await this.profileRepository.addProfile(profile);
    return {status: "success", message: "Profile created successfully"}
  }

  async fetchAllProfile(fetchAllProfileDTO: FetchAllProfileDTO): Promise<IResponseData> {
    const {paginationOptions, search} = fetchAllProfileDTO;
    fetchAllProfileDTO.hasAccess();
    const response: PaginationData = await this.profileRepository.fetchAllProfile({paginationOptions, search});
    return {status: "success", data: response.getPaginatedData()}
  }

  async updateProfile(updateProfileDTO: UpdateProfileDTO): Promise<IResponseMessage> {
    updateProfileDTO.hasAccess();
    const profile: ProfileEntity = updateProfileDTO.profile;
    await this.profileRepository.update(profile.toObject());
    return {status: "success", message: "Profile updated successfully"}
  }

  async fetchProfileById(fetchProfileByIdDTO: FetchProfileByIdDTO): Promise<any> {
    const {profileId} = fetchProfileByIdDTO;
    fetchProfileByIdDTO.hasAccess();
    const response: ProfileEntity = await this.profileRepository.fetchById(profileId);
    return {status: "success", data: response}
  }
}

export default ProfileService


