import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Font from '../assets/fonts';

type ButtonVariant = 'filled' | 'outlined';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant; // 'filled' (default) or 'outlined'
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'filled',
  style,
  textStyle,
}) => {
  const isFilled = variant === 'filled';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: '100%' }, // Make button full width by default
        isFilled ? styles.filled : styles.outlined,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          isFilled ? styles.filledText : styles.outlinedText,
          textStyle,
          {
            fontFamily: Font.AsapSemiBold,
            fontSize: 18,
            letterSpacing: 0.5,
            textShadowColor: isFilled ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginVertical: 16,
  },
  filled: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  outlined: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filledText: {
    color: '#fff',
  },
  outlinedText: {
    color: '#000',
  },
});

export default CustomButton;
