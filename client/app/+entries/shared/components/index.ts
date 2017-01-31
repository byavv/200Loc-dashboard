import { KEY_VALUE_COMPONENTS } from './key-value';
import { OptionInput } from './option-input';
import { PluginForm } from './plugin-form';
import { STEP_TABS_COMPONENTS } from './step-tabs';
import { ToggleGroup } from './toggle-group';

export const ENTRIES_COMPONENTS = [
    ...KEY_VALUE_COMPONENTS,
    ...STEP_TABS_COMPONENTS,
    ToggleGroup,
    PluginForm,
    OptionInput
]

export * from './key-value';
export * from './option-input';
export * from './plugin-form';
export * from './step-tabs';
export * from './toggle-group';