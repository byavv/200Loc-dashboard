import { APP_ACTIONS } from "./actions";
import { GUARDS } from "./guards";

export const APP_CORE_API_PROVIDERS = [
    ...APP_ACTIONS,
    ...GUARDS
];