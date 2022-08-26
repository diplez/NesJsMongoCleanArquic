/**
 * Datos de entrada de sockets (LOGIN)
 */
export class UserInDto{
    id: string;
    name: string;
    lastname? : string;
    username: string;
    avatar?: string;
    room: string;
    active: boolean;
}