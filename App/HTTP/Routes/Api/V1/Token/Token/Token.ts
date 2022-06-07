import * as express from "express";
import {WithErrorHandling} from "../../../../Errors/WithErrorHandling";
import TokenController from "../../../../Controllers/Api/V1/Token/Token";
import container from "../../../../../Infrastructure/IocContainer/container";
import auth from "../../../../Middleware/auth";
import server from "../../../../../Infrastructure/Config/server";


const tokenController = container.get(TokenController);
const router = express.Router({mergeParams: true});

router.post("/token", auth, WithErrorHandling(tokenController.createToken))
router.get(`/token/all`, auth, WithErrorHandling(tokenController.fetchAllToken))
router.put("/token/:tokenId", auth, WithErrorHandling(tokenController.updateToken))
router.get("/token/:tokenId", auth, WithErrorHandling(tokenController.fetchTokenById))


export default router;