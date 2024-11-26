import { Elysia, t } from "elysia"
import { example } from "./controllers/example.controller"
import { swaggerConfig } from "./config/swagger.config"
import { MongoDB } from "./config/database.config"
import { tlsConfig } from "./config/tls.config"
import cors from "@elysiajs/cors"
import { jwtConfig } from "./config/jwt.config"
import { AccountController } from "./controllers/account.controller"
import { UserController } from "./controllers/user.controller"


MongoDB.connect()

const app = new Elysia()
  .use(cors())
  .use(jwtConfig)
  .use(swaggerConfig)
  .use(AccountController)
  .use(UserController)

  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'

console.log(
  `🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`
)
