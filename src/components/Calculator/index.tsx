import React, { useEffect, useRef, useState } from "react";
import { evaluate } from "mathjs";
import { OPERANDS } from "./constants";

import { Input, InputRef } from "./Input";
import { Keyboard } from "./Keyboard";
import "./style.css";

// type Node = {
//   value?: string;
//   left?: number | string | Node;
//   right?: number | string | Node;
// };

const isOperand = (val: string) => {
  return OPERANDS.includes(val);
};

// const isHigherPriority = (val: string) => {
//   return OPERANDS.includes(val) && HIGHER_PRIORITY_OPERANDS.includes(val);
// }

const calculateValue = (inputArray: string[]) => {
  let targetString = inputArray.join("");
  if (inputArray.length === 0) {
    return 0;
  }
  if (isOperand(inputArray[inputArray.length - 1])) {
    const calculateArray = inputArray.slice(0, -1);
    targetString = calculateArray.join("");
  }
  return evaluate(targetString);
  // let top: Node|undefined = undefined;
  // for (let i = 0; i < inputArray.length; i += 1) {
  //   if (top) {
  //     if (isHigherPriority(inputArray[i+1])) {

  //     } else if (isOperand(inputArray[i+1])) {
  //       top = {
  //         value: inputArray[i+1],
  //         left: inputArray[i],
  //         right: top
  //       }
  //     }
  //   } else {
  //     top = {
  //       value: inputArray[i + 1],
  //       left: inputArray[i]
  //     }
  //   }
  // }
};

export const Calculator: React.FC = () => {
  const [inputArry, setInputArray] = useState<string[]>([]);
  const [isNextClear, setIsNextClear] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<InputRef | null>(null);
  const [displayValue, setDisplayValue] = useState("");
  useEffect(() => {
    setDisplayValue(`${calculateValue(inputArry)}`);
    setIsNextClear(inputArry[inputArry.length - 1] === "=");
  }, [inputArry.length]);
  const handlePush = (value: string, operand: string) => {
    if (isNextClear) {
      setInputArray([value, operand]);
      setIsNextClear(false);
    } else {
      setInputArray((prev) => [...prev, value, operand]);
    }
  };
  const handleChange = (value: string) => {
    inputRef.current?.keyPress(value);
  };
  const handleClear = () => {
    if (isEditing) {
      inputRef.current?.clear();
    } else {
      setInputArray([]);
    }
  };
  const handleInputStart = () => {
    setIsEditing(true);
  };
  const handleInputEnd = () => {
    setIsEditing(false);
  };
  return (
    <div className="calculator-wrapper">
      <Input
        ref={inputRef}
        defaultValue={displayValue}
        onPush={handlePush}
        onInputStart={handleInputStart}
        onInputEnd={handleInputEnd}
      />
      <Keyboard onChange={handleChange} onClear={handleClear} />
    </div>
  );
};
