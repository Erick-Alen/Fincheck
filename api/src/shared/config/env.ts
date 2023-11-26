import { plainToClass } from 'class-transformer'
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator'
// import 'dotenv/config'
class Env{
  @IsString()
  @IsNotEmpty()
  @NotEquals('YOUR_SECRET')
  jwtSecret: string

  @IsString()
  @IsNotEmpty()
  @NotEquals('YOUR_DATABASE_URL')
  dbUrl: string
}

export const env: Env = plainToClass(Env, {
  jwtSecret: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  dbUrl:'postgresql://root:root@localhost:5432/fincheck?schema=public?'
})

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 4))
}
