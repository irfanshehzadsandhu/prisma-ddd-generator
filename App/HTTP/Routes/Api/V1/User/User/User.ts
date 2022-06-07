import * as express from "express";
import {WithErrorHandling} from "../../../../Errors/WithErrorHandling";
import UserController from "../../../../Controllers/Api/V1/User/User";
import container from "../../../../../Infrastructure/IocContainer/container";
import auth from "../../../../Middleware/auth";
import server from "../../../../../Infrastructure/Config/server";


const userController = container.get(UserController);
const router = express.Router({mergeParams: true});

router.post("/user", auth, WithErrorHandling(userController.createUser))
router.get(`/user/all`, auth, WithErrorHandling(userController.fetchAllUser))
router.put("/user/:userId", auth, WithErrorHandling(userController.updateUser))
router.get("/user/:userId", auth, WithErrorHandling(userController.fetchUserById))


export default router;