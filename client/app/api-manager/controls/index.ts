import { ToggleGroup } from './toggleGroup';
import { DynamicForm } from './dynamicForm';
import { OptionInput } from './optionInput';
import { PluginSettings } from './pluginSettingsForm';
import { KeyValueItem } from './keyValueItem';
import { KeyValueItemsList } from './keyValueItemsList';

export * from './toggleGroup';
export * from './pluginSettingsForm';
export * from './dynamicForm';
export * from './keyValueItem';
export * from './keyValueItemsList';

export var API_MANAGER_CONTROLS = [
    ToggleGroup, OptionInput,
    DynamicForm, PluginSettings,
    KeyValueItem, KeyValueItemsList
];