import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { AVAILABLE_INPUTS, OPERANDS } from "./constants";

export type InputProps = {
  defaultValue?: string;
  onPush?: (value: string, operand: string) => void;
  onInputStart?: () => void;
  onInputEnd?: () => void;
};

export type InputRef = {
  clear: () => void;
  keyPress: (key: string) => void;
};

export const Input = React.forwardRef<InputRef, InputProps>(
  ({ defaultValue, onPush, onInputStart, onInputEnd }, ref) => {
    const [value, setValue] = useState(defaultValue ?? "");
    const [isNextClear, setIsNextClear] = useState(false);
    useEffect(() => {
      setValue(defaultValue ?? "");
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        setValue("");
        onInputEnd?.();
      },
      keyPress: (key: string) => {
        console.log(key);
        handleKeyUp({ key } as React.KeyboardEvent<HTMLTextAreaElement>);
      },
    }));

    const handleKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Backspace") {
          if (value.length > 0) {
            setValue(value.slice(0, -1));
          }
        }
        if (event.key === "+/-") {
          setValue(`-${value}`);
          setIsNextClear(true);
        }
        if (AVAILABLE_INPUTS.includes(event.key)) {
          if (OPERANDS.includes(event.key)) {
            if (event.key === "+/-" || event.key === "%") {
              if (event.key === "%") {
                setValue(`${parseFloat(value) / 100}`);
              }
              setIsNextClear(true);
            } else {
              setIsNextClear(true);
              onPush?.(value, event.key);
              onInputEnd?.();
            }
            return;
          }
          if (event.key === "." && value.includes(".")) {
            return;
          }
          if (value === "" || value === "0") {
            onInputStart?.();
          }
          setValue(
            isNextClear || value === "0" ? event.key : `${value}${event.key}`
          );
          setIsNextClear(false);
        }
      },
      [value, isNextClear, onInputEnd, onInputEnd, onPush]
    );

    return (
      <textarea
        className="calculator-input"
        value={value}
        onKeyUp={handleKeyUp}
      ></textarea>
    );
  }
);
