const reservedPaths = ['login', 'api', 'admin'];

export function validUsernameFormat(username: string): boolean {
    const regex = /^[a-zA-Z0-9_-]{3,20}$/;
    return regex.test(username)  && !reservedPaths.includes(username);
}