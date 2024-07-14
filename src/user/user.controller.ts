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
    async listOne(@Param('id', ParseIntPipe) id: number) {
        return {user:{}, id}
    }

    @Put(':id')
    async update(@Body() {name, email, password}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'put',
            name, email, password,
            id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() {name, email, password}: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'patch',
            name, email, password,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
             id
        }
    }
}