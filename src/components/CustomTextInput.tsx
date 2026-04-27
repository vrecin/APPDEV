import { Text, View, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState, FC, ViewStyle, TextStyle } from 'react';

interface CustomTextInputProps extends Omit<TextInputProps, 'style'> {
  placeholder?: string;
  label: string;
  labelStyle?: TextStyle;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  label,
  labelStyle,
  value,
  onChangeText,
  containerStyle,
  textStyle,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9B7BAE"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          textStyle,
          {
            height: 48,
            color: (textStyle as any)?.color || '#2E073F',
            backgroundColor: (textStyle as any)?.backgroundColor || '#F0E8F7',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderBottomWidth: focused ? 2 : 0,
            borderBottomColor: focused ? '#A976D1' : 'transparent',
          },
        ]}
      />
    </View>
  );
};

export default CustomTextInput;
