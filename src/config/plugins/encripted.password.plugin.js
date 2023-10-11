import bcrypt from 'bcrypt';

export const encryptedPassword = async(password) => {
    const salts = await bcrypt.genSalt(12);

    return await bcrypt.hash(password, salts)
}

export const verifyPassword = async(bodyPassword, userPassword) => {
    return await bcrypt.compare(bodyPassword, userPassword)
}