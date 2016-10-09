import { ToggleGroup } from './toggleGroup';
import { DynamicForm2 } from './dynamicForm2';
import { OptionInput } from './optionInput';
import { PluginSettings } from './pluginSettingsForm';
import { HeaderItem } from './headerItem';
import { HeadersList } from './headersList';

export * from './toggleGroup';
export * from './pluginSettingsForm';
export * from './dynamicForm2';
export * from './headerItem';
export * from './headersList';

export var API_MANAGER_CONTROLS = [
    ToggleGroup, OptionInput,
    DynamicForm2, PluginSettings,
    HeaderItem, HeadersList
];