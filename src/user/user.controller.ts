import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { PARAMTYPES_METADATA } from "@nestjs/common/constants";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body) {
        return {body};
    }

    @Get()
    async listAll() {
        return {users:[]}
    }

    @Get(':id')
    async listOne(@Param() params) {
        return {user:{}, params}
    }

    @Put(':id')
    async update(@Body() body, @Param() params) {
        return {
            method: 'put',
            body,
            params
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body, @Param() params) {
        return {
            method: 'patch',
            body,
            params
        }
    }

    @Delete(':id')
    async delete(@Param() params) {
        return {
            params
        }
    }
}