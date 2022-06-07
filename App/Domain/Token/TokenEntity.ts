
import BaseEntity from "./BaseEntity";
class TokenEntity extends BaseEntity {
   public id: number;               
    public device: string;               
    public operatingSystem: string;       
 
   constructor(id: number, device: string, operatingSystem: string) {
     super();   
     this.id = id;   
     this.device = device;   
     this.operatingSystem = operatingSystem;   
   }

   static createFromInput(obj): TokenEntity {
     const token  = new TokenEntity(obj.id, obj.device, obj.operatingSystem);
     return token; 
   }
   
   static createFromDb(obj): TokenEntity {
     const token  = new TokenEntity(obj.id, obj.device, obj.operatingSystem);
     token.setDates(obj.createdAt, obj.updatedAt);
     return token; 
   }


}
export default TokenEntity;