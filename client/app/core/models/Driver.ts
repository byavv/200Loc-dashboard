/* tslint:disable */
export interface IDriver {
    name: string;
    description: string;
    settings?: Array<any>;
}

export class Driver {
    name: string;
    description: string;
    settings?: Array<any> = [];
    constructor(instance?: IDriver) {
        Object.assign(this, instance);
    }
}
