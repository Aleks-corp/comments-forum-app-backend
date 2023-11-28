import { Response, Request, NextFunction } from "express";
import ctrlWrapper from "../middleware/ctrl-wrapper";
import { Comment } from "../entities/Comment.entity";
import dataSource from "../config/database";
import { IsNull } from "typeorm";

const loadReplies = async (commentId: string): Promise<Comment[]> => {
  const replies = await dataSource
    .getRepository(Comment)
    .find({ where: { parentId: commentId }, relations: ["replies"] });

  for (const reply of replies) {
    reply.replies = await loadReplies(reply.id);
  }
  return replies;
};

const getComments = async (req: Request, res: Response) => {
  const { limit, page } = req.query;
  const take = limit ? parseInt(limit as string) : 25;
  const skip = page ? (parseInt(page as string) - 1) * take : 0;
  const mainComments = await dataSource.getRepository(Comment).find({
    where: { parentId: IsNull() },
    take,
    skip,
    relations: ["replies"],
  });

  for (const comment of mainComments) {
    comment.replies = await loadReplies(comment.id);
  }
  res.json(mainComments);
};

const getRepliesComments = async (req: Request, res: Response) => {
  const { limit = 25, page = 1 } = req.query;
  const take = limit ? parseInt(limit as string) : 25;
  const skip = page ? (parseInt(page as string) - 1) * take : 0;
  const { id: commentId } = req.params;

  const replies = await dataSource.getRepository(Comment).find({
    where: { parentId: commentId },
    take,
    skip,
    relations: ["replies"],
  });

  res.json(replies);
};

const postNewComment = (req: Request, res: Response) => {
  const comment = dataSource.getRepository(Comment).save(req.body);
  res.status(201).json(comment);
};

const postReplyComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await dataSource.getRepository(Comment).findOneBy({ id });
  const replyComment = { ...req.body, parent: comment };
  const savedReplyComment = await dataSource
    .getRepository(Comment)
    .save(replyComment);
  res.status(201).json(savedReplyComment);
};

export default {
  getComments: ctrlWrapper(getComments),
  getRepliesComments: ctrlWrapper(getRepliesComments),
  postNewComment: ctrlWrapper(postNewComment),
  postReplyComment: ctrlWrapper(postReplyComment),
};
