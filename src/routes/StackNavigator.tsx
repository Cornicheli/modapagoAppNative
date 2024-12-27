import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import {
    DiscountScreen,
    EmailPayView,
    NotificationView,
    QrCharge,
    RequestMoneyScreen,
    TransferView,
    ValidationPay,
} from '@/views';
import { Colors } from '@/themes/colors';
import { NotificationIcon } from '@/components/NotificationIcon';
import { LoginView } from '@/views/LoginView';
import { BalanceView } from '@/views/BalanceView';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoginView">
            <Stack.Screen
                name="Root"
                component={TabNavigator}
                options={{
                    headerShown: false,
                    headerRight: () => <NotificationIcon />,
                }}
            />
            <Stack.Screen
                name="LoginView"
                component={LoginView}
                options={{
                    title: '',
                }}
            />
            <Stack.Screen
                name="TransferView"
                component={TransferView}
                options={{
                    title: 'Transferir',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                    headerRight: () => <NotificationIcon />,
                }}
            />
            <Stack.Screen
                name="NotificationView"
                component={NotificationView}
                options={{
                    title: 'Notification',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                }}
            />
            <Stack.Screen
                name="RequestMoneyScreen"
                component={RequestMoneyScreen}
                options={{
                    title: 'Solicitud de dinero',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                    headerRight: () => <NotificationIcon />,
                }}
            />
            <Stack.Screen
                name="NotificationIcon"
                component={NotificationIcon}
                options={{
                    title: 'NotificationIcon',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                }}
            />
            <Stack.Screen
                name="BalanceView"
                component={BalanceView}
                options={{
                    title: 'Balance',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                }}
            />
            <Stack.Screen
                name="DiscountScreen"
                component={DiscountScreen}
                options={{
                    title: 'Descuentos',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                }}
            />
            <Stack.Screen
                name="QrCharge"
                component={QrCharge}
                options={{
                    title: 'Cobrar con QR',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                    headerRight: () => <NotificationIcon />,
                }}
            />
            <Stack.Screen
                name="ValidationPay"
                component={ValidationPay}
                options={{
                    title: 'Verifica los datos',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                }}
            />

            <Stack.Screen
                name="EmailPayView"
                component={EmailPayView}
                options={{
                    title: 'Enviar por correo',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                    headerRight: () => <NotificationIcon />,
                }}
            />
        </Stack.Navigator>
    );
};

export type StackParamList = {
    Root: undefined;
    TabNavigator: undefined;
    TransferView: undefined;
    NotificationView: undefined;
    NotificationIcon: undefined;
    RequestMoneyScreen: undefined;
    LoginView: undefined;
    BalanceView: undefined;
    DiscountScreen: undefined;
    QrCharge: undefined;
    ValidationPay: undefined;
    EmailPayView: undefined;
};
