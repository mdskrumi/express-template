// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
export interface HookNextFunction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error?: Error): any;
}
