
import BaseEntity from "./BaseEntity";
class UserEntity extends BaseEntity {
   public id: number;               
    public createdAt: Date;               
    public updatedAt: Date;               
    public email: string;               
    public name: string;       
 
   constructor(id: number, createdAt: Date, updatedAt: Date, email: string, name: string) {
     super();   
     this.id = id;   
     this.createdAt = createdAt;   
     this.updatedAt = updatedAt;   
     this.email = email;   
     this.name = name;   
   }

   static createFromInput(obj): UserEntity {
     const user  = new UserEntity(obj.id, obj.createdAt, obj.updatedAt, obj.email, obj.name);
     return user; 
   }
   
   static createFromDb(obj): UserEntity {
     const user  = new UserEntity(obj.id, obj.createdAt, obj.updatedAt, obj.email, obj.name);
     user.setDates(obj.createdAt, obj.updatedAt);
     return user; 
   }


}
export default UserEntity;