import { Body, Controller, Post } from '@nestjs/common';
import { UserInterface } from '../model/user.interface';
import { AuthService } from '../service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/')
  public async authenticateUser(@Body() user: UserInterface) {
    return await this.authService.authenticateUser(user);
  }
  @Post('/logout')
  public async logout(@Body() user: UserInterface) {
    return await this.authService.logout(user);
  }
}
