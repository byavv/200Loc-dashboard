import { MasterActions } from './masterActions';
import { DefaultsActions } from './defaultsActions';

export * from "./defaultsActions";
export * from "./masterActions";

export const APP_ACTIONS = [
    MasterActions,
    DefaultsActions
];