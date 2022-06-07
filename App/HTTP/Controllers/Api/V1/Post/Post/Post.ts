import PostService from "../../../../../Application/Post/PostService";
import CreatePostDTO from "../../../../../Application/Post/CreatePostDTO";
import {injectable} from "inversify";
import FetchAllPostDTO from "../../../../../Application/Post/FetchAllPostDTO";
import UpdatePostDTO from "../../../../../Application/Post/UpdatePostDTO";
import FetchPostByIdDTO from "../../../../../Application/Post/FetchPostByIdDTO";

@injectable()
class PostController {

  constructor(private PostService: PostService) {
  }

  createPost = async (request) => {
    const input = new CreatePostDTO(request);
    return await this.PostService.createPost(input);
  }

  fetchAllPost = async (request) => {
    const input = new FetchAllPostDTO(request);
    return await this.PostService.fetchAllPost(input);
  }

  updatePost = async (request) => {
    const input = new UpdatePostDTO(request);
    return await this.PostService.updatePost(input)
}
  fetchPostById = async (request) => {
    const input = new FetchPostByIdDTO(request);
    return await this.PostService.fetchPostById(input);
  }

}

export default PostController