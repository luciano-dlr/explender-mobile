import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const Login = () => {

    const navigation = useNavigation();


    const toHomeScreen = () => {
        navigation.navigate('Home');
    };


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Soy un login </Text>
            <TouchableOpacity onPress={toHomeScreen} style={styles.button}>
                <Text style={styles.buttonText}>Ir a Home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#4285F4', // Puedes cambiar el color según tus preferencias
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

