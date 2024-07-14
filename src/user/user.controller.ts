import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() {name, email, password}: CreateUserDTO) {
        return {name, email, password};
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
    async update(@Body() {name, email, password}: UpdatePutUserDTO, @Param() params) {
        return {
            method: 'put',
            name, email, password,
            params
        }
    }

    @Patch(':id')
    async updatePartial(@Body() {name, email, password}: UpdatePatchUserDTO, @Param() params) {
        return {
            method: 'patch',
            name, email, password,
            params
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
             id
        }
    }
}