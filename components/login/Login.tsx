import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Button, useColorScheme } from 'react-native';
import auth from '@react-native-firebase/auth';
import RNOtpVerify from 'react-native-otp-verify';
import createStyles from './Login.styles';

import { login } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
  const [view, setView] = useState<'password' | 'otp' | 'verify'>('password');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [confirm, setConfirm] = useState<auth.ConfirmationResult | null>(null);
  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\d{10}$/; // Adjust this regex based on your phone number format
        return phoneRegex.test(phone);
    };

  useEffect(() => {
    RNOtpVerify.getHash()
      .then(console.log)
      .catch(console.log);

    RNOtpVerify.getOtp()
      .then(p => {
        RNOtpVerify.addListener(message => {
          const otp = /(\d{6})/g.exec(message)?.[1];
          if (otp) {
            setOtp(otp);
            Alert.alert('OTP Auto-filled', `Your OTP is ${otp}`, [{ text: 'OK' }], { cancelable: false });
            RNOtpVerify.removeListener();
          }
        });
      })
      .catch(console.log);

    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  const handleLoginWithPassword = async () => {
        if (!phoneNumber || !password) {
            Alert.alert('Empty Field', `Please fill in all the fields.`, [{ text: 'OK' }], { cancelable: false });
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            Alert.alert('Invalid Phone number', `Please enter a valid phone number`, [{ text: 'OK' }], { cancelable: false });
            return;
        }

        if (password.length < 6) {
            Alert.alert('Invalid Password', `Password must be at least 6 characters long.`, [{ text: 'OK' }], { cancelable: false });
            return;
        }
        try {
            setLoading(true);
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000)); 
            // Replace with actual login logic: await dispatch(login(phoneNumber));
            dispatch(login(phoneNumber)); // Dispatch the login action
        } catch (error) {
            Alert.alert('Error', `Failed to log in. Please try again later.`, [{ text: 'OK' }], { cancelable: false });
        } finally {
            setLoading(false);
        }
  };

  const handleSendOtp = async () => {
    
    if (phoneNumber) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        Alert.alert('OTP Sent', 'Please check your phone for the OTP.', [{ text: 'OK' }], { cancelable: false });
        setView('verify'); // Show OTP verification screen after sending OTP
      } catch (error: any) {
        Alert.alert('Error', error.message, [{ text: 'OK' }], { cancelable: false });
      }
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.', [{ text: 'OK' }], { cancelable: false });
    }
  };

  const handleVerifyOtp = async () => {
    if (confirm && otp) {
      try {
        await confirm.confirm(otp);
        Alert.alert('Success', 'Phone number verified successfully!', [{ text: 'OK' }], { cancelable: false });
        try {
            setLoading(true);
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000)); 
            // Replace with actual login logic: await dispatch(login(phoneNumber));
            dispatch(login(phoneNumber)); // Dispatch the login action
        } catch (error) {
            Alert.alert('Error', `Failed to log in. Please try again later.`, [{ text: 'OK' }], { cancelable: false });
        } finally {
            setLoading(false);
        }
      } catch (error: any) {
        Alert.alert('Invalid OTP', 'The OTP entered is incorrect.', [{ text: 'OK' }], { cancelable: false });
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter the OTP sent to your phone.', [{ text: 'OK' }], { cancelable: false });
    }
  };

  const colors = {
    light: {
      background: '#f5f5f5',
      formBackground: '#ffffff',
      shadow: '#000000',
      textPrimary: '#333333',
      textInput: '#000000', // Text color in input fields
      border: '#ddd',
      inputBackground: '#f9f9f9',
      buttonBackground: '#007BFF',
      buttonText: '#ffffff',
      linkColor: '#007BFF',
      alertBackground: '#ffffff',
      alertText: '#000000',
    },
    dark: {
      background: '#000000',
      formBackground: '#1e1e1e',
      shadow: '#000000',
      textPrimary: '#ffffff',
      textInput: '#ffffff', // Text color in input fields
      border: '#444',
      inputBackground: '#333333',
      buttonBackground: '#1e90ff',
      buttonText: '#ffffff',
      linkColor: '#1e90ff',
      alertBackground: '#333333',
      alertText: '#ffffff',
    },
  };

  const currentColors = colors[colorScheme || 'light'];
  const styles = createStyles(currentColors);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        {view === 'password' && (
          <>
            <Text style={styles.title}>Login with Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#aaa'}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#aaa'}
            />
            <TouchableOpacity style={styles.button} onPress={handleLoginWithPassword}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setView('otp')}>
              <Text style={styles.link}>Login with OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {view === 'otp' && (
          <>
            <Text style={styles.title}>Login with OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#aaa'}
            />
            <Button title="Send OTP" onPress={handleSendOtp} color={currentColors.buttonBackground} />
            <TouchableOpacity onPress={() => setView('password')}>
              <Text style={styles.link}>Login with Password</Text>
            </TouchableOpacity>
          </>
        )}

        {view === 'verify' && (
          <>
            <Text style={styles.title}>Verify OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#aaa'}
            />
            <Button title="Verify OTP" onPress={handleVerifyOtp} color={currentColors.buttonBackground} />
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setView('otp')} style={styles.linkContainer}>
                <Text style={styles.link}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendOtp} style={styles.linkContainer}>
                <Text style={styles.link}>Resend Code</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;