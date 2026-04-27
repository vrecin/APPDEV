import React, { FC, ReactNode } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface CustomButtonProps {
  containerStyle?: ViewStyle;
  label: string;
  textStyle?: TextStyle;
  onPress: () => void;
  loading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  containerStyle,
  label,
  textStyle,
  onPress,
  loading,
}) => {
  const { width } = Dimensions.get('window');

  return (
    <>
      {loading ? (
        <View style={{ height: 80, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={'#A976D1'} />
        </View>
      ) : (
        <View style={containerStyle}>
          <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
            <View style={{ padding: width * 0.014 }}>
              <Text style={textStyle}>{label}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CustomButton;
