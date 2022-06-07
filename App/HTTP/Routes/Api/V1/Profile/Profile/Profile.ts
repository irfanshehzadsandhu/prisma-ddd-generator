import * as express from "express";
import {WithErrorHandling} from "../../../../Errors/WithErrorHandling";
import ProfileController from "../../../../Controllers/Api/V1/Profile/Profile";
import container from "../../../../../Infrastructure/IocContainer/container";
import auth from "../../../../Middleware/auth";
import server from "../../../../../Infrastructure/Config/server";


const profileController = container.get(ProfileController);
const router = express.Router({mergeParams: true});

router.post("/profile", auth, WithErrorHandling(profileController.createProfile))
router.get(`/profile/all`, auth, WithErrorHandling(profileController.fetchAllProfile))
router.put("/profile/:profileId", auth, WithErrorHandling(profileController.updateProfile))
router.get("/profile/:profileId", auth, WithErrorHandling(profileController.fetchProfileById))


export default router;