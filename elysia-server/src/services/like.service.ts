import mongoose from "mongoose"
import { User } from "../models/user.model"
import { userPagination, userPaginator } from "../type/user.type"
import { QueryHelper } from "../helpers/query.helper"

export const LikeService = {
    toggleLike: async function (user_id: string, target_id: string): Promise<boolean> {
        const target = await User.findById(target_id).select("_id").exec()
        if (!target)
            throw new Error("Not Implement")

        const LikeTarget = await User.findOne({
            _id: new mongoose.Types.ObjectId(user_id),
            following: { $elemMatch: { $eq: target._id } }
        }).exec()

        if (LikeTarget) {
            await User.findByIdAndUpdate(user_id, { $pull: { following: target_id } })
            await User.findOneAndUpdate(target_id, { $pull: { followers: user_id } })
        } else {
            await User.findByIdAndUpdate(user_id, { $addToSet: { following: target_id } })
            await User.findOneAndUpdate(target_id, { $addToSet: { followers: user_id } })
        }

        return true
    },
    getFollowers: async function (user_id: string, query: userPagination): Promise<userPaginator> {
        const _query = await User.findById(user_id)
            .populate({
                path: "follwers",
                match: { $and: QueryHelper.parseUserQuery(query) },
                select: '_id username display_name photos introducetion interest location gender date_of_birth',
                populate: { path: "photos" }
            })

        const [docs, total] = await Promise.all({
            _query.exec(),
            User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
                {}
            ])
        })
    },
    getFollowing: function (user_id: string, query: userPagination): Promise<userPaginator> {
        throw new Error("Not Implement")
    }
}