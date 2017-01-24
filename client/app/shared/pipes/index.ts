import { FirstUpPipe } from './firstUppercase';
import { SafePipe, SafeHtmlPipe } from './safe.pipe';

export * from './firstUppercase';
export * from './safe.pipe';

export const APP_PIPES_PIPES = [
    FirstUpPipe, SafePipe, SafeHtmlPipe
]