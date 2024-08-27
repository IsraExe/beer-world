import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const createUser = async (name, email, password) => {

    await prisma.user.create({
        data: {
            name,
            email,
            password
        },
    });

};

export const updateUser = async (id, name, email, password) => {
    await prisma.user.update({
        where: {
            id
        },
        data: {
            name,
            email,
            password
        },
    });
};

export const viewUsers = async () => {
    const users = await prisma.user.findMany();
  
    return users;
};

export const deleteUser = async (id) => {
    await prisma.user.delete({
        where: {
            id
        },
    });
};