export interface IUser {
    accessToken?: any;
    username?: string;
}

export class User implements IUser {
    accessToken?: any;
    username?: string;

    constructor(data?: IUser) {
        Object.assign(this, data);
    }
    isAuthenticated() {
        return !!this.accessToken;
    }
} 
