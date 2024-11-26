import Elysia from "elysia"

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['user']
})

    .get('/all', () => {
        return {
            text: "Hello World"
        }
    }, {
        isSignIn: true
    })