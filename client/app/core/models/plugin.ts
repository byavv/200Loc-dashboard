/* tslint:disable */
export interface IPlugin {
    name: string;
    description: string;
    dependenciesTemplate: any;
    settingsTemplate: any;
    order?: number;
    active?: boolean;
    valid?: boolean;
    dependencies?: Array<any>;
    settings?: Array<any>;
}

export class Plugin {
    name: string;
    description: string;
    dependenciesTemplate: any;
    settingsTemplate: any = {};
    order?: number;
    active?: boolean = false;
    valid?: boolean = false;
    dependencies?: Array<any> = [];
    settings?: Array<any> = [];

    constructor(instance?: Plugin) {
        Object.assign(this, instance);
    }
}
