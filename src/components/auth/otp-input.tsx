import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const codeFieldStyles: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 20,
  gap: 8,
};

export const OTPInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (val: string) => void;
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={codeFieldStyles}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          className={`w-12 h-14 border rounded-lg items-center justify-center ${
            isFocused ? 'border-tertiary-600' : 'border-gray-300'
          }`}
          onLayout={getCellOnLayoutHandler(index)}
        >
          <Text className="text-xl">
            {symbol || (isFocused ? <Cursor /> : '')}
          </Text>
        </View>
      )}
    />
  );
};
