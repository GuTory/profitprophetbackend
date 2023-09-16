import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: environment.googleClientId,
      clientSecret: environment.googleClientSecret,
      callbackURL: environment.callbackUrl,
      scope: environment.scope,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    console.log(accessToken, refreshToken, profile);
  }
}
