import CreateTokenDTO from "./CreateTokenDTO";
import {ITokenRepository, ITokenRepositoryId} from "../../Domain/Entities/Token/TokenRepositoryInterface";
import {inject, injectable} from "inversify";
import FetchAllTokenDTO from "./FetchAllTokenDTO";
import UpdateTokenDTO from "./UpdateTokenDTO";
import IResponseMessage from "../Utils/IResponseMessage";
import IResponseData from "../Utils/IResponseData";
import FetchTokenByIdDTO from "./FetchTokenByIdDTO";
import TokenEntity from "../../Domain/Entities/Token/TokenEntity";
import PaginationData from "../../Infrastructure/Utils/PaginationData";

@injectable()
class TokenService {
  constructor(
    @inject(ITokenRepositoryId) private tokenRepository: ITokenRepository) {
  }

  async createToken(createTokenDTO: CreateTokenDTO): Promise<IResponseMessage> {
    createTokenDTO.hasAccess();
    const token: TokenEntity = createTokenDTO.token;
    await this.tokenRepository.addToken(token);
    return {status: "success", message: "Token created successfully"}
  }

  async fetchAllToken(fetchAllTokenDTO: FetchAllTokenDTO): Promise<IResponseData> {
    const {paginationOptions, search} = fetchAllTokenDTO;
    fetchAllTokenDTO.hasAccess();
    const response: PaginationData = await this.tokenRepository.fetchAllToken({paginationOptions, search});
    return {status: "success", data: response.getPaginatedData()}
  }

  async updateToken(updateTokenDTO: UpdateTokenDTO): Promise<IResponseMessage> {
    updateTokenDTO.hasAccess();
    const token: TokenEntity = updateTokenDTO.token;
    await this.tokenRepository.update(token.toObject());
    return {status: "success", message: "Token updated successfully"}
  }

  async fetchTokenById(fetchTokenByIdDTO: FetchTokenByIdDTO): Promise<any> {
    const {tokenId} = fetchTokenByIdDTO;
    fetchTokenByIdDTO.hasAccess();
    const response: TokenEntity = await this.tokenRepository.fetchById(tokenId);
    return {status: "success", data: response}
  }
}

export default TokenService


