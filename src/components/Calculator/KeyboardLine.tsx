import React from "react";

import type { KeyboardLineType } from "./constants";

type KeyboardLineProps = {
  keyboardLine: KeyboardLineType;
  onPress: (key: string) => void;
  onClear: () => void;
};

export const KeyboardLine: React.FC<KeyboardLineProps> = ({
  keyboardLine,
  onPress,
  onClear,
}) => {
  const handlePress = (label: string) => {
    if (label === "AC") {
      onClear();
      return;
    }
    onPress(label);
  };
  return (
    <div className="calculator-keyboard-line">
      {keyboardLine.map((keyboardInfo) => (
        <div
          className={`calculator-keyboard-key ${
            keyboardInfo.variant ?? "input"
          }`}
          style={{ flex: keyboardInfo.flex }}
          onClick={() => handlePress(keyboardInfo.label)}
        >
          {keyboardInfo.label}
        </div>
      ))}
    </div>
  );
};
