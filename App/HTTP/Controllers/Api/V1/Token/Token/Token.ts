import TokenService from "../../../../../Application/Token/TokenService";
import CreateTokenDTO from "../../../../../Application/Token/CreateTokenDTO";
import {injectable} from "inversify";
import FetchAllTokenDTO from "../../../../../Application/Token/FetchAllTokenDTO";
import UpdateTokenDTO from "../../../../../Application/Token/UpdateTokenDTO";
import FetchTokenByIdDTO from "../../../../../Application/Token/FetchTokenByIdDTO";

@injectable()
class TokenController {

  constructor(private TokenService: TokenService) {
  }

  createToken = async (request) => {
    const input = new CreateTokenDTO(request);
    return await this.TokenService.createToken(input);
  }

  fetchAllToken = async (request) => {
    const input = new FetchAllTokenDTO(request);
    return await this.TokenService.fetchAllToken(input);
  }

  updateToken = async (request) => {
    const input = new UpdateTokenDTO(request);
    return await this.TokenService.updateToken(input)
}
  fetchTokenById = async (request) => {
    const input = new FetchTokenByIdDTO(request);
    return await this.TokenService.fetchTokenById(input);
  }

}

export default TokenController