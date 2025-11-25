import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type CustomInputProps = {
  icon?: React.ReactNode;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  [key: string]: any; // for any additional props
};

const CustomInput: React.FC<CustomInputProps> = ({
  icon,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'none',
  value,
  onChangeText,
  secureTextEntry = false,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
    </View>
  );
};
/**
 * To match the UI of the input box in LoginScreen.tsx,
 * you may need to adjust the styles here to match those used in LoginScreen.
 * If LoginScreen uses a specific border color, background, or padding, update the styles above accordingly.
 * If LoginScreen uses a different component structure, you may need to add or remove wrappers or style props.
 *
 * If you want to reuse the exact same styles, you can import them from LoginScreen or copy them here.
 *
 * Example (if LoginScreen uses a blue border and more padding):
 *
 * const styles = StyleSheet.create({
 *   inputContainer: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     padding: 16,
 *     borderWidth: 2,
 *     borderColor: '#007AFF',
 *     borderRadius: 10,
 *     backgroundColor: '#F5F8FF',
 *   },
 *   icon: {
 *     fontSize: 22,
 *     marginRight: 10,
 *   },
 *   input: {
 *     flex: 1,
 *     fontSize: 18,
 *     color: '#222',
 *     padding: 0,
 *   },
 * });
 *
 * If you provide the relevant style details from LoginScreen, I can update the styles here to match exactly.
 */
// const styles = StyleSheet.create({
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf6fb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 6,
  },
  icon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    fontSize: 22,
    color: '#111',
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#222',
    padding: 0,
    backgroundColor: 'transparent',
  },
});

export default CustomInput;
