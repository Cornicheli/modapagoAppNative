import { ViewStyle } from 'react-native';

export interface CardQrProps {
    onChange: () => void;
    cameraStyle?: ViewStyle;
}

export interface DividerProps {
    width?: number;
    orientation?: 'horizontal' | 'vertical';
    color?: string;
    dividerStyle?: any;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface ModalDetailProps {
    imports: string;
    dates?: string;
    coments: string;
    keyModal: string;
    nameFrom: string;
    nameTo: string;
    visible?: boolean;
    onChange?: () => void;
    balance?: string;
}

export interface PropsInputModalFilter {
    title: string;
    onChange: () => void;
    selectFilter: string | number;
}

export interface ModalDiscountDetailProps {
    nameLocal: string;
    addressLocal: string;
    percentajeLocal: string;
    topeLocal: string;
    visible: boolean;
    keyModal: number | string;
    closeModal: () => void;
}

export interface ModalDetailPayProps {
    brandName?: string;
    brandCuit?: string;
    commentPay?: string;
    totalPay?: string;
    onChange?: () => void;
    keyModal?: number | string;
}

export interface PropsCard {
    title: string;
    icon: string;
}

export interface PropsCardBalance {
    title: string;
    titleValue: any;
    subTitleValue?: string;
    colorTitleValue: string;
}

export interface PropsCardHome {
    logoIcon: any;
    title: string;
    onChange?: () => void;
}

export interface PropsCardMoney {
    title: string;
    titleNumber: string;
    titleNumberColor: string;
}

export interface PropsCardPay {
    title: string;
    logoIcon?: React.ReactNode;
    icon?: number;
    onChange?: () => void;
}

export interface PropsCoupon {
    title: string;
    titleDiscount: string;
    titleDirrection: string;
    key?: string | number;
    onChange: () => void;
}

export interface PropsInput {
    title: string;
    titleNumber: string;
    icon?: any;
    onChange?: () => void;
}

export interface PropsInputBalance {
    icon: number;
    titleTransfer: string;
    titleDate: string;
    titleCheck: string;
    titleTotal: string;
    onChange: () => void;
}

export interface PropsInputLocal {
    photo?: string;
    title: string;
    logoIcon?: React.ReactNode;
    titleInput: string;
    icon?: number;
    onChange: () => void;
}

export interface PropsInputService {
    title: string;
    icon: string;
}

export interface PropsModalFilter {
    onChange: () => void;
    keyModal?: string;
    visible?: boolean;
    onSelectFilter: any;
}
