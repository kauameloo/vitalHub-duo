import React, { useEffect, useState } from "react";

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from "react-native-confirmation-code-field";
import { Keyboard, StyleSheet } from "react-native";
import { CodeText, CodeView } from "./StyleCodeInput";

const CELL_COUNT = 4;

export default function CodeInput({ code, setCode }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);

    // Verifica se o código está completo e o teclado está visível para ocultá-lo
    if (newCode.length === CELL_COUNT && keyboardVisible) {
      Keyboard.dismiss();
    }
  };

  return (
    <CodeView>
      <CodeField
        value={code}
        onChangeText={handleCodeChange}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <CodeText key={index}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </CodeText>
        )}
      />
    </CodeView>
  );
}

const codeFieldStyle = StyleSheet.create({
  gap: 20,
});
