import { MasterActions } from './masterActions';
import { DefaultsActions } from './defaultsActions';
import { ValidationActions } from './validationActions';
import { ConfigActions } from './configActions';

export * from "./defaultsActions";
export * from "./masterActions";
export * from "./validationActions";
export * from "./configActions";

export const APP_ACTIONS = [
    MasterActions,
    DefaultsActions,
    ValidationActions,
    ConfigActions
];