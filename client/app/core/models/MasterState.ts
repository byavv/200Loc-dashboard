export class MasterState {
    general?: any;
    plugins?: any;
    
    constructor(data?: MasterState) {
        Object.assign(this, data);
    }    
} 
