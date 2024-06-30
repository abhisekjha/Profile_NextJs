const reservedPaths = ['login', 'api', 'admin', 'dashboard'];

export function isValidUsernameFormat(username: string): boolean {
    const regex = /^[a-zA-Z0-9_-]{3,20}$/;
    return regex.test(username)  && !reservedPaths.includes(username);
}