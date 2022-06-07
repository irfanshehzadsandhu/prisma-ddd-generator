
import BaseEntity from "./BaseEntity";
class CategoryEntity extends BaseEntity {
   public id: number;               
    public name: string;       
 
   constructor(id: number, name: string) {
     super();   
     this.id = id;   
     this.name = name;   
   }

   static createFromInput(obj): CategoryEntity {
     const category  = new CategoryEntity(obj.id, obj.name);
     return category; 
   }
   
   static createFromDb(obj): CategoryEntity {
     const category  = new CategoryEntity(obj.id, obj.name);
     category.setDates(obj.createdAt, obj.updatedAt);
     return category; 
   }


}
export default CategoryEntity;