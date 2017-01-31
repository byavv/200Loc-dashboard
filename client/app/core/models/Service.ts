/* tslint:disable */
export interface IService {
    name: string;
    description: string;
    settings?: Array<any>;
}

export class Service {
    name: string;
    description: string;
    settings?: Array<any> = [];
    constructor(instance?: IService) {
        Object.assign(this, instance);
    }
}
