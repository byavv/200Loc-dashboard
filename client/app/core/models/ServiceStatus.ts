export interface ServiceStatusInterface {
    id?: string,
    error?: string,
    message?: string,
    status?: string,
    name?: string,
    version?: string
}

export class ServiceStatus implements ServiceStatusInterface {
    id: string;
    error: string;
    message: string;
    status: string;
    name: string;
    version: string;
    constructor(instance?: ServiceStatusInterface) {
        Object.assign(this, instance);
    }
}
