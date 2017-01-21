import { ToggleGroup } from './toggleGroup';
import { OptionInput } from './optionInput';
import { PluginForm } from './pluginForm';
import { KeyValueItem } from './keyValueItem';
import { KeyValueItemsList } from './keyValueItemsList';

export * from './toggleGroup';
export * from './pluginForm';
export * from './keyValueItem';
export * from './keyValueItemsList';

export const ENTRIES_CONTROLS = [
    ToggleGroup, OptionInput, PluginForm,
    KeyValueItem, KeyValueItemsList
];