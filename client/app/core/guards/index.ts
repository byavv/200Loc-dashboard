import { IsAuthenticatedGuard } from './authenticated.guard';
import { IsNotAuthenticatedGuard } from './nauthenticated.guard';

export * from './authenticated.guard';
export * from './nauthenticated.guard'

export var GUARDS = [
    IsAuthenticatedGuard,
    IsNotAuthenticatedGuard
];