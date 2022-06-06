import BaseEntity from "./BaseEntity";
class PostEntity extends BaseEntity {
   public firstName: string;               
    public lastName: string;       
 
   constructor(firstName: string, lastName: string) {
     super();   
     this.firstName = firstName;   
     this.lastName = lastName;   
   }

   static createFromInput(obj): PostEntity {
     const post  = new PostEntity(obj.firstName, obj.lastName);
     return post; 
   }
   
   static createFromDb(obj): PostEntity {
     const post  = new PostEntity(obj.firstName, obj.lastName);
     post.setDates(obj.createdAt, obj.updatedAt);
     return post; 
   }


}
export default PostEntity;