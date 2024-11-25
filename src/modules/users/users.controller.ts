import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { of } from 'rxjs';

@Controller('/users')
export class UsersController {
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return of({
      success: true,
      statusCode: 200,
      data: {
        name: 'Shivam Shukla',
        userName: 'shivams10',
        reqBody: req.body,
      },
    });
  }
}
