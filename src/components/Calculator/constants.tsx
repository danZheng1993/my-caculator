export const AVAILABLE_INPUTS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
  "%",
  "+",
  "-",
  "*",
  "/",
  "=",
];

export const OPERANDS = ["%", "+", "-", "*", "/", "="];

export const HIGHER_PRIORITY_OPERANDS = ["*", "/"];

export type KeyInfo = {
  label: string;
  flex?: number;
  variant?: "binary" | "unary" | "input";
};

export type KeyboardLineType = KeyInfo[];

export const KEYBOARD_ARRAY = [
  [
    { label: "AC", variant: "unary" },
    { label: "+/-", variant: "unary" },
    { label: "%", variant: "unary" },
    { label: "/", variant: "binary" },
  ],
  [
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "*", variant: "binary" },
  ],
  [
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "-", variant: "binary" },
  ],
  [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "+", variant: "binary" },
  ],
  [{ label: "0", flex: 2 }, { label: "." }, { label: "=", variant: "binary" }],
] as KeyboardLineType[];
