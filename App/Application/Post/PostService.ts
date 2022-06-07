import CreatePostDTO from "./CreatePostDTO";
import {IPostRepository, IPostRepositoryId} from "../../Domain/Entities/Post/PostRepositoryInterface";
import {inject, injectable} from "inversify";
import FetchAllPostDTO from "./FetchAllPostDTO";
import UpdatePostDTO from "./UpdatePostDTO";
import IResponseMessage from "../Utils/IResponseMessage";
import IResponseData from "../Utils/IResponseData";
import FetchPostByIdDTO from "./FetchPostByIdDTO";
import PostEntity from "../../Domain/Entities/Post/PostEntity";
import PaginationData from "../../Infrastructure/Utils/PaginationData";

@injectable()
class PostService {
  constructor(
    @inject(IPostRepositoryId) private postRepository: IPostRepository) {
  }

  async createPost(createPostDTO: CreatePostDTO): Promise<IResponseMessage> {
    createPostDTO.hasAccess();
    const post: PostEntity = createPostDTO.post;
    await this.postRepository.addPost(post);
    return {status: "success", message: "Post created successfully"}
  }

  async fetchAllPost(fetchAllPostDTO: FetchAllPostDTO): Promise<IResponseData> {
    const {paginationOptions, search} = fetchAllPostDTO;
    fetchAllPostDTO.hasAccess();
    const response: PaginationData = await this.postRepository.fetchAllPost({paginationOptions, search});
    return {status: "success", data: response.getPaginatedData()}
  }

  async updatePost(updatePostDTO: UpdatePostDTO): Promise<IResponseMessage> {
    updatePostDTO.hasAccess();
    const post: PostEntity = updatePostDTO.post;
    await this.postRepository.update(post.toObject());
    return {status: "success", message: "Post updated successfully"}
  }

  async fetchPostById(fetchPostByIdDTO: FetchPostByIdDTO): Promise<any> {
    const {postId} = fetchPostByIdDTO;
    fetchPostByIdDTO.hasAccess();
    const response: PostEntity = await this.postRepository.fetchById(postId);
    return {status: "success", data: response}
  }
}

export default PostService


