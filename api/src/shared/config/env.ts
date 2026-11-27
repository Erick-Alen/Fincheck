import { plainToClass } from 'class-transformer'
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator'
import 'dotenv/config'

class Env{
  @IsString()
  @IsNotEmpty()
  @NotEquals('YOUR_SECRET')
  jwtSecret: string
}

export const env: Env = plainToClass(Env, {
  jwtSecret: process.env.JWT_SECRET,
})

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 4))
}
