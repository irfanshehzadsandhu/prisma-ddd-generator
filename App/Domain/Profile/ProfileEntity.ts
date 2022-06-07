
import BaseEntity from "./BaseEntity";
class ProfileEntity extends BaseEntity {
   public id: number;               
    public bio: string;               
    public userId: number;       
 
   constructor(id: number, bio: string, userId: number) {
     super();   
     this.id = id;   
     this.bio = bio;   
     this.userId = userId;   
   }

   static createFromInput(obj): ProfileEntity {
     const profile  = new ProfileEntity(obj.id, obj.bio, obj.userId);
     return profile; 
   }
   
   static createFromDb(obj): ProfileEntity {
     const profile  = new ProfileEntity(obj.id, obj.bio, obj.userId);
     profile.setDates(obj.createdAt, obj.updatedAt);
     return profile; 
   }


}
export default ProfileEntity;