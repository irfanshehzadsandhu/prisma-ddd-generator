import * as express from "express";
import {WithErrorHandling} from "../../../../Errors/WithErrorHandling";
import CategoryController from "../../../../Controllers/Api/V1/Category/Category";
import container from "../../../../../Infrastructure/IocContainer/container";
import auth from "../../../../Middleware/auth";
import server from "../../../../../Infrastructure/Config/server";


const categoryController = container.get(CategoryController);
const router = express.Router({mergeParams: true});

router.post("/category", auth, WithErrorHandling(categoryController.createCategory))
router.get(`/category/all`, auth, WithErrorHandling(categoryController.fetchAllCategory))
router.put("/category/:categoryId", auth, WithErrorHandling(categoryController.updateCategory))
router.get("/category/:categoryId", auth, WithErrorHandling(categoryController.fetchCategoryById))


export default router;