const bcrypt = require('bcrypt');

// passwords to hash of previously added users
const usersToHash = [
    { username: 'ahuynh', password: '' },
    { username: 'coolcat', password: '' }
];

// Function to hash passwords
async function hashPasswords() {
    const hashedUsers = [];

    for (const user of usersToHash) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        hashedUsers.push({ username: user.username, password: hashedPassword });
        console.log(`Username: ${user.username}, Hashed Password: ${hashedPassword}`);
    }

    return hashedUsers;
}

hashPasswords().then(hashedUsers => {
    console.log('Hashed users:', hashedUsers);
}).catch(error => {
    console.error('Error hashing passwords:', error);
});