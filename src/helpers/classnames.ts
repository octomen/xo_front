export const mix = (...args: Array<string|undefined|null|false>) => {
    return args.filter(Boolean).join(' ');
};
