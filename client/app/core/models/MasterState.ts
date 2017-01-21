export class Master {
    general?: any;
    plugins?: any;
    
    constructor(data?: Master) {
        Object.assign(this, data);
    }    
} 
