import React from 'react';
import { useDispatch } from 'react-redux';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { logout } from '@/redux/authSlice';

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log('logout');
        dispatch(logout());
    };

    return (
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 24, // 'mt-6' is equivalent to 24 in pixel size (assuming 4px per unit)
        backgroundColor: '#007BFF', // Blue color
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // White text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LogoutButton;