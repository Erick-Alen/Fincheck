import { Controller, Post, Body, SetMetadata, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { SetPublic } from 'src/shared/decorators/SetPublic';

@SetPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }
  @Post('signin')
  signin(@Body() signinDto: SigninDto){
    return this.authService.signin(signinDto)
  }

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }
}
