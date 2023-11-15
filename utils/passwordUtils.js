import bcrypt from 'bcrypt'

// HASHES THE PASSWORD
export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
            reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
            });
        });
        });
    };

// COMPARE || DECRYPT FUNCITON
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};