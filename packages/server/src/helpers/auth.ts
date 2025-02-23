import { User } from '@/models/user-entity';
import { getRandomInt } from '@/utils';
import { getRepository } from 'typeorm';

export const getOrCreateUserWithEmail = async (
    destination: string,
    name: string
): Promise<User> => {
    const userRepository = getRepository(User);
    let user = await userRepository.findOne({ email: destination });
    if (!user) {
        user = userRepository.create({
            email: destination,
            username: name,
            avatar: `/a${getRandomInt(1, 8)}.png`,
        });
        user = await userRepository.save(user);
    }
    return user;
};

export const getUserById = async (id: number): Promise<User | undefined> => {
    const userRepository = getRepository(User);
    return await userRepository.findOne(id);
};
