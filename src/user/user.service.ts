import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async create(data: CreateUserDTO) {
        return this.prisma.user.create({
            data,
        });
    }

    async listAll() {
        return this.prisma.user.findMany({});
    }

    async listOne(id: number) {

        await this.userExists(id);

        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, {name, email, password, dateofbirth}: UpdatePutUserDTO) {
        
        await this.userExists(id);

        return this.prisma.user.update({
            data: {name, email, password, dateofbirth: dateofbirth ? new Date(dateofbirth) : null},
            where: {
                id
            }
        });
    }

    async updatePartial(id: number, {name, email, password, dateofbirth}: UpdatePatchUserDTO) {
        
        await this.userExists(id);

        const data: any = {};

        if (name) { 
            data.name = name; 
        }

        if (email) { 
            data.email = email; 
        }
        
        if (password) { 
            data.password = password; 
        }

        if (dateofbirth) {
            data.dateofbirth = new Date(dateofbirth);
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {

        await this.userExists(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async userExists(id: number) {
        if (!(await this.prisma.user.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`The user ${id} does not exist`)
        }
    }
}