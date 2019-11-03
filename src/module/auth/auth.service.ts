import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }
  
  sign(obj: AuthDto): string {
    return this.jwtService.sign(obj);
  }

  valid(token: string): AuthDto {
    return this.jwtService.verify(token);
  }
}