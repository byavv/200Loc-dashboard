import { ToggleGroup } from './toggleGroup';
import { DynamicForm } from './dynamicForm';
import { OptionInput } from './optionInput';
import { PluginForm } from './pluginForm';
import { KeyValueItem } from './keyValueItem';
import { KeyValueItemsList } from './keyValueItemsList';

export * from './toggleGroup';
export * from './pluginForm';
export * from './dynamicForm';
export * from './keyValueItem';
export * from './keyValueItemsList';

export var API_MANAGER_CONTROLS = [
    ToggleGroup, OptionInput,
    DynamicForm, PluginForm,
    KeyValueItem, KeyValueItemsList
];