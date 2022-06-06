import db from "../Database/Models";
import PostEntity from "../../Domain/Entities/Post/PostEntity";
import PaginationData from "../Utils/PaginationData";
import {Op} from "sequelize";
import {IPostRepository} from "../../Domain/Entities/Post/PostRepositoryInterface";
import {injectable} from "inversify";
import AppError from "../../HTTP/Errors/AppError";

const {Post} = db;

@injectable()
class PostRepository implements IPostRepository {

  async fetchAllPost({paginationOptions, postId, search}): Promise<PaginationData<FirmAdminEntity>> {
    let whereCondition = {}
    if (search) {
      whereCondition = {
        postId,
        [Op.or]: [{name: {[Op.like]: `%${search}%`}}]
      }
    } else {
      whereCondition = {postId}
    }
    const {count, rows: all} = await Post.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit: paginationOptions.limit(),
      offset: paginationOptions.offset()
    })
    const paginationData: PaginationData<any> = new PaginationData<any>(paginationOptions, count)
    all.forEach(firmAdminObj => {
      const post = PostEntity.createFromDb(postObj);
      paginationData.addItem(post;)
    })
    return paginationData;
  }

  async fetchById(PostId: string): Promise<any> {
    const postObj = await Post.findOne({where: {postId}});
    if (!postObj) {
      throw new Error("Invalid Post details");
    }
    return PostEntity.createFromDb(postObj);
  }

  async update(post: PostEntity): Promise<boolean> {
    return await Post.update(post, {where: {postId: postId}})
  }

  async remove(postId: string): Promise<boolean> {
    return await Post.update({deletedAt: Date.now()}, {where: {postId}});
  }

}

export default PostRepository;

