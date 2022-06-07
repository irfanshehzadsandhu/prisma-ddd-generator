import BaseDTO from "../Utils/BaseDTO";

class FetchTokenByIdDTO extends BaseDTO {
  public tokenId: string;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    this.tokenId = request.params.tokenId
  }
}

export default FetchTokenByIdDTO;