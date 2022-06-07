import BaseDTO from "../Utils/BaseDTO";
import TokenEntity from "../../Domain/Entities/Token/TokenEntity";

class CreateTokenDTO extends BaseDTO {
  public tokenId: string;
  public token: TokenEntity;
  
  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.tokenId = TokenEntity.generateId();
    this.token = TokenEntity.createFromInput(params);
  }

}

export default CreateTokenDTO;