import BaseDTO from "../Utils/BaseDTO";
import TokenEntity from "../../Domain/Entities/Token/TokenEntity";

class UpdateTokenDTO extends BaseDTO {
  public token: TokenEntity;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.tokenId = request.params.tokenId
    this.token = TokenEntity.createFromInput(params)
  }
}

export default UpdateTokenDTO;