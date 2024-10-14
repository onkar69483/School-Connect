import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, useColorScheme } from 'react-native';
import auth from '@react-native-firebase/auth';
import RNOtpVerify from 'react-native-otp-verify';

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [confirm, setConfirm] = useState<auth.ConfirmationResult | null>(null);

  const colorScheme = useColorScheme();

  useEffect(() => {
    RNOtpVerify.getHash()
      .then(console.log)
      .catch(console.log);

    RNOtpVerify.getOtp()
      .then(p => {
        RNOtpVerify.addListener(message => {
          const otp = /(\d{6})/g.exec(message)?.[1];
          if (otp) {
            setVerificationCode(otp);
            Alert.alert('OTP Auto-filled', `Your OTP is ${otp}`);
            RNOtpVerify.removeListener();
          }
        });
      })
      .catch(console.log);

    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  const sendOTP = async () => {
    if (phoneNumber) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
    }
  };

  const confirmOTP = async () => {
    if (confirm && verificationCode) {
      try {
        await confirm.confirm(verificationCode);
        Alert.alert('Success', 'Phone number verified successfully!');
      } catch (error: any) {
        Alert.alert('Invalid OTP', 'The OTP entered is incorrect.');
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter the OTP sent to your phone.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.title, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>
        Login with OTP
      </Text>
      {!confirm ? (
        <>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={colorScheme === 'dark' ? '#888888' : '#aaaaaa'}
            onChangeText={text => setPhoneNumber(text)}
            keyboardType="phone-pad"
            value={phoneNumber}
            style={[
              styles.input,
              {
                backgroundColor: colorScheme === 'dark' ? '#333333' : '#f9f9f9',
                color: colorScheme === 'dark' ? '#ffffff' : '#000000',
              },
            ]}
          />
          <Button title="Send OTP" onPress={sendOTP} color={colorScheme === 'dark' ? '#1e90ff' : '#007bff'} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor={colorScheme === 'dark' ? '#888888' : '#aaaaaa'}
            onChangeText={text => setVerificationCode(text)}
            keyboardType="number-pad"
            value={verificationCode}
            style={[
              styles.input,
              {
                backgroundColor: colorScheme === 'dark' ? '#333333' : '#f9f9f9',
                color: colorScheme === 'dark' ? '#ffffff' : '#000000',
              },
            ]}
          />
          <Button title="Verify OTP" onPress={confirmOTP} color={colorScheme === 'dark' ? '#1e90ff' : '#007bff'} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default Login;
