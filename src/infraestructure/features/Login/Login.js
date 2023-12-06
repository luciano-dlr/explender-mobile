import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isLogged, login } from '../../auth/authService';

const Login = () => {

    const navigation = useNavigation();
    const [dni, setDni] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');


    const handleLogin = async () => {
        try {
            // Crear el objeto usuario con los valores ingresados
            const usuarioObject = {
                TipoDoc: 'DNI',
                NroDoc: dni,
                Usuario: usuario,
                Pass: contrasena,
                CodApp: 0
            };

            // Llamada al servicio de autenticación
            console.log('Antes de llamar al servicio de autenticación');
            const response = await login(usuarioObject);
            console.log('Después de llamar al servicio de autenticación:', response);


            // Verificación de éxito en la autenticación
            console.log('Valor de response.success:', response.success);

            if (response && response.token) {
                // Autenticación exitosa
                console.log('Inicio de sesión exitoso');
                await checkSession();
                navigation.navigate('Home');
            } else if (response && response.codigoError === 401) {
                // Credenciales inválidas
                alert('Credenciales inválidas. Verifica tus datos.');
            } else {
                // Otro tipo de error
                alert('Error de autenticación. Verifica tus credenciales.');
            }

        } catch (error) {
            console.error('Error en el manejo de inicio de sesión:', error);
        }
    };

    const checkSession = async () => {
        try {
            const logged = await isLogged();
            console.log('¿Usuario autenticado?', logged);
        } catch (error) {
            console.error('Error al verificar el estado de inicio de sesión:', error);
        }
    };
    return (
        <View style={styles.container}>

            <Text style={styles.title}>My Country® Autogestión</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Num. de documento"
                    keyboardType="numeric"
                    maxLength={8}
                    value={dni}
                    onChangeText={(text) => setDni(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    value={usuario}
                    onChangeText={(text) => setUsuario(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    value={contrasena}
                    onChangeText={(text) => setContrasena(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    form: {
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    }
});
