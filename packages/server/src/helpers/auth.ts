import { User } from '@/models/user-entity';
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
        });
        user = await userRepository.save(user);
    }
    return user;
};
