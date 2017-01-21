import { MasterActions } from './masterActions';
import { DefaultsActions } from './defaultsActions';
import { ValidationActions } from './validationActions';
import { ConfigActions } from './configActions';
import { UserActions } from './user.actions';

export * from "./defaultsActions";
export * from "./masterActions";
export * from "./validationActions";
export * from "./configActions";
export * from "./user.actions";

export const APP_ACTIONS = [
    MasterActions,
    DefaultsActions,
    ValidationActions,
    ConfigActions,
    UserActions
];