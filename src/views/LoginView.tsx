import { useState } from 'react';
import { Divider } from '@/components';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { login } from '@/db/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/routes/StackNavigator';
import modapagoBanner from '../styles/modapagoBanner.png';
import { spacingStyle } from '@/themes/spacingStyle';

type NavigationProps = StackNavigationProp<StackParamList>;

export const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProps>();

    const submitLogin = async () => {
        try {
            const result = await login({ username, password });
            result.error === 'success' && navigation.navigate('Root');
            // console.log('Result login = ', JSON.stringify(result, null, 2));
        } catch (error) {
            console.log(error, 'Error login');
        }
    };

    return (
        <ScrollView
            style={{ backgroundColor: '#FFFFFF' }}
        >
            <View style={styles.header}>
                <Image style={styles.image} source={modapagoBanner} />
                <Text style={styles.title} numberOfLines={2}>
                    Ingresa con tus datos de Modapago
                </Text>
            </View>
            <View style={styles.body}>
                <View style={styles.contentInput}>
                    <Text style={styles.titleInput}>
                        Usuario o Email de Modapago
                    </Text>
                    <TextInput
                        onChangeText={setUsername}
                        value={username}
                        style={styles.titlePlaceholdere}
                        placeholder="Usuario"
                    />
                    <Divider />
                </View>
                <View style={styles.contentInput}>
                    <Text style={styles.titleInput}>Clave de Modapago:</Text>
                    <TextInput
                        style={styles.titlePlaceholdere}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Clave"
                    />
                    <Divider />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={submitLogin}>
                    <Text style={styles.titleButton}>INICIAR</Text>
                </TouchableOpacity>
                <View style={styles.buttonFooter}>
                    <Text style={styles.titleFooter}>
                        {' '}
                        ¿Olvidate tu clave?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('password new');
                        }}>
                        <Text style={styles.titleFooterButton}>
                            {' '}
                            Hace click aca{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // content: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     backgroundColor: 'white',
    //     flex: 1,
    // },
    contentInput: {
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        marginVertical: spacingStyle.medium,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 375,
        height: 125,
        resizeMode: 'contain',
        marginVertical: spacingStyle.large,
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: spacingStyle.large,
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        width: 280,
        padding: spacingStyle.small,
        fontWeight: '400',
    },
    titleInput: {
        fontSize: 18,
        color: 'black',
        width: '100%',
    },
    titlePlaceholdere: {
        color: 'black',
        fontSize: 22,
        marginVertical: spacingStyle.small,
    },
    titleFooter: {
        fontSize: 18,
    },
    titleFooterButton: {
        color: '#5260ff',
        fontSize: 18,
    },
    button: {
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff3399',
        width: 350,
        height: 50,
        marginBottom: spacingStyle.large,
    },
    titleButton: {
        fontSize: 22,
        color: 'white',
        fontWeight: '700',
    },
    buttonFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacingStyle.small,
    },
});
