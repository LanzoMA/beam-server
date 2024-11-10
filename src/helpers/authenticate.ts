import bcrypt from 'bcrypt';
import { getUserPasswordByEmail } from "../db/users";

export const authenticate = async (email: string, password: string): Promise<boolean> => {
    const passwordHash: string = await getUserPasswordByEmail(email);

    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

    return isPasswordCorrect;
};