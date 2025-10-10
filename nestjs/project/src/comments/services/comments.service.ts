import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { Comments } from '../comments.schema';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}
  async getAllComments() {
    const comments = await this.commentsModel.find();
    return comments;
  }

  async createComment(id: string, commentData: CommentsCreateDto) {
    const targetCat = await this.catsRepository.findCatByIdWithoutPassword(id);
    if (!targetCat) {
      throw new NotFoundException(`좋아요를 할 수 있는 대상이 없습니다.`);
    }

    const { contents, author } = commentData;
    const validatedAuthor =
      await this.catsRepository.findCatByIdWithoutPassword(author);
    if (!validatedAuthor) {
      throw new NotFoundException(`좋아요를 한 Cat이 없습니다.`);
    }
    const newComment = new this.commentsModel({
      author: validatedAuthor.id,
      contents,
      info: targetCat.id,
    });
    return await newComment.save();
  }

  async plusLike(id: string) {
    const comment = await this.commentsModel.findById(id);
    if (!comment) {
      throw new NotFoundException(`ID가 ${id}인 게시글을 찾을 수 없습니다.`);
    }
    comment.likeCount += 1;
    return await comment?.save();
  }
}
