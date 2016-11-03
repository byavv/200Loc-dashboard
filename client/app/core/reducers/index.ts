import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';


import * as master from './master';

import { masterReducer, EntryCreationMasterState } from './master';

import { MasterState } from '../models';

export interface AppState {
    master: EntryCreationMasterState;
}

export default combineReducers({
    master: masterReducer
});

export function getMasterState() {
    return (state$: Observable<AppState>) => {
        return state$
            .select(s => s.master)
    };
}

export function getEntryData() {
    return compose(master.getMasterValue(), getMasterState());
}
