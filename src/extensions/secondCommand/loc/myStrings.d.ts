declare interface ISecondCommandCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'SecondCommandCommandSetStrings' {
  const strings: ISecondCommandCommandSetStrings;
  export = strings;
}
