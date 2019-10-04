declare interface IMyExtensionCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MyExtensionCommandSetStrings' {
  const strings: IMyExtensionCommandSetStrings;
  export = strings;
}
