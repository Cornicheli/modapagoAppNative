import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '@/themes/colors';
import { HomeView } from '@/views/HomeView';
import { SummaryView } from '@/views/SummaryView';
import { TransferView } from '@/views/TransferView';
import { NotificationIcon } from '@/components/NotificationIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { spacingStyle } from '@/themes/spacingStyle';
import { HistoryView } from '@/views/HistoryView';
import { ValidationPay } from '@/views';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: Colors.colorModapagoBase,
                    height: 75,
                    padding: spacingStyle.small,
                },
            }}>
            <Tab.Screen
                name="Home"
                component={HomeView}
                options={{
                    headerTitle: 'Resumen',
                    title: '',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                            name="user-circle"
                            size={size}
                            color={color}
                        />
                    ),
                    headerTintColor: Colors.colorModatexContrast,
                    headerRight: () => <NotificationIcon />,
                }}
            />
            <Tab.Screen
                name="Transferir"
                component={TransferView}
                options={{
                    headerTitle: 'Transferir',
                    title: '',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="arrow-up" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                    headerRight: () => <NotificationIcon />,
                }}
            />
            <Tab.Screen
                name="Actividad"
                component={HistoryView}
                options={{
                    title: '',
                    headerTitle: 'Actividad',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo
                            name="text-document-inverted"
                            size={size}
                            color={color}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                    headerRight: () => <NotificationIcon />,
                }}
            />

            <Tab.Screen
                name="Services"
                component={SummaryView}
                options={{
                    headerTitle: 'Pago de Servicios',
                    title: 'PagoFacil',
                    headerStyle: {
                        backgroundColor: Colors.colorModatexBase,
                    },
                    headerTintColor: Colors.colorModatexContrast,
                    headerRight: () => <NotificationIcon />,
                }}
            />
        </Tab.Navigator>
    );
}
