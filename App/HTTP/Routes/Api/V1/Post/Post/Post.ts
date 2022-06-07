import * as express from "express";
import {WithErrorHandling} from "../../../../Errors/WithErrorHandling";
import PostController from "../../../../Controllers/Api/V1/Post/Post";
import container from "../../../../../Infrastructure/IocContainer/container";
import auth from "../../../../Middleware/auth";
import server from "../../../../../Infrastructure/Config/server";


const postController = container.get(PostController);
const router = express.Router({mergeParams: true});

router.post("/post", auth, WithErrorHandling(postController.createPost))
router.get(`/post/all`, auth, WithErrorHandling(postController.fetchAllPost))
router.put("/post/:postId", auth, WithErrorHandling(postController.updatePost))
router.get("/post/:postId", auth, WithErrorHandling(postController.fetchPostById))


export default router;