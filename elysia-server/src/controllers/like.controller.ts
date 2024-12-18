import Elysia from "elysia"
import { AuthMiddleWare } from "../middleware/auth.middleware"
import { UserDto } from "../type/user.type"

export const LikeController = new Elysia({
    prefix: "api/like",
    tags: ['Like']
})

    .use(AuthMiddleWare)
    .use(UserDto)

    .put('/', ({ body: { target_id }, set }) => {
        try {
            const
        } catch (error) {

        }
    })