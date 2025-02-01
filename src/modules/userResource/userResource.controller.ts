import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserResourceDto } from 'src/dto';

let USER_RESOURCES = [];

@Controller('/user-resource')
export class UserResourceController {
  @Post()
  addUserResource(@Body() createUserResourceDto: CreateUserResourceDto) {
    USER_RESOURCES.push(createUserResourceDto);
    return {
      message: 'User resource added successfully',
      data: {
        success: true,
        status: 201,
      },
    };
  }

  @Get()
  getUserResources() {
    return {
      message: 'User resources fetched successfully',
      data: {
        success: true,
        status: 200,
        userResources: USER_RESOURCES,
      },
    };
  }
  @Get(':id')
  getParticularUserResource(@Param('id') id: number) {
    const filteredUser = USER_RESOURCES.find((user) => user.id === +id);

    if (filteredUser) {
      return {
        message: 'User resource fetched successfully',
        data: {
          success: true,
          status: 200,
          userResource: filteredUser,
        },
      };
    } else {
      return {
        message: 'User resource not found',
        data: {
          success: false,
          status: 404,
        },
      };
    }
  }
  @Put(':id')
  updateUserResource(
    @Param('id') id: number,
    @Body() updateUserDTO: CreateUserResourceDto,
  ) {
    const userIndex = USER_RESOURCES.findIndex((user) => user.id === +id);
    if (!userIndex && userIndex !== 0) {
      return {
        message: 'User resource not found',
        data: {
          success: false,
          status: 404,
        },
      };
    }
    USER_RESOURCES[userIndex] = updateUserDTO;
    return {
      message: 'User resource updated successfully',
      data: {
        success: true,
        status: 200,
      },
    };
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    const userIndex = USER_RESOURCES.findIndex((user) => user.id === +id);
    if (!userIndex && userIndex !== 0) {
      return {
        message: 'User resource not found',
        data: {
          success: false,
          status: 404,
        },
      };
    }
    USER_RESOURCES = USER_RESOURCES.filter((user) => user.id !== +id);
  }
}
