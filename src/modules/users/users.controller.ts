import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { of } from 'rxjs';

interface VideoParams {
  id: number;
  name: string;
}
interface AudioParams {
  audioName: string;
}

interface BodyDTO {
  username: 'string';
}

@Controller('/users')
export class UsersController {
  @Get('/profile')
  getProfile(@Req() req: Request) {
    // of is used to return an observable of the response object which will be automatically converted to JSON
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

  @Post('/profile')
  @HttpCode(HttpStatus.ACCEPTED)
  // to set the Header in the response, we can use the @Header() decorator
  @Header('Cache-Control', 'none')
  @Header('X-Header', 'shiv')
  // to redirect the user to a different route, we can use the @Redirect() decorator
  @Redirect('/users/account', 302)
  updateProfile(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.status(200);
    //  when we dont pass the passthrough option to the @Res() decorator, we have to manually set the status code and send the response
    // res.json({
    //   success: true,
    // });
    // when we pass the passthrough option to the @Res() decorator, we can directly return the response object
    // for dynamic redirection based upon logics inside return object
    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber < 5) {
      return {
        url: '/users/wallet',
      };
    }
    return {
      url: '/users/account',
    };
  }

  @Get('/account')
  getUserAccount() {
    return { success: true, statusCode: 200, data: { account: 'premium' } };
  }
  // Params
  @Get('/videos/:id/:name')
  // to get the id value from the URL add "id in @Param() decorator" lik @Param('id'
  getVideos(@Param() params: VideoParams) {
    return { success: true, statusCode: 200, data: { videoId: params.id } };
  }
  @Get('/audios')
  // Query Params
  getAudios(@Query() query: AudioParams) {
    return {
      success: true,
      statusCode: 200,
      data: { audioName: query.audioName },
    };
  }
  //Headers
  getAudioHeaders(@Headers() headers: Record<string, any>) {
    return {
      success: true,
      statusCode: 200,
      data: { headers },
    };
  }
  @Post('/body')
  // Body for url encoded and Json type data
  getBodyData(@Body() requestData: BodyDTO) {
    return {
      success: true,
      statusCode: 200,
      data: { name: requestData?.username },
    };
  }
}

// Notes:
// Header are used to set and send the headers in the response
// Headers are used to extract the headers from the request
