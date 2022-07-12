import React from "react";
import { KEYBOARD_ARRAY } from "./constants";

import { KeyboardLine } from "./KeyboardLine";

type KeyboardProps = {
  onChange: (key: string) => void;
  onClear: () => void;
};

export const Keyboard: React.FC<KeyboardProps> = ({ onChange, onClear }) => {
  return (
    <div className="calculator-keyboard">
      {KEYBOARD_ARRAY.map((keyboardLine, index) => (
        <KeyboardLine
          keyboardLine={keyboardLine}
          key={`line_${index}`}
          onPress={onChange}
          onClear={onClear}
        />
      ))}
    </div>
  );
};
