import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';

interface NotificationState {
    stopAll: boolean;
    quiteMode: boolean;
    groupNotifications: boolean;
    messages: boolean;
    birthdayNotifications: boolean;
    fromHappenHub: boolean;
}

type NotificationAction = { type: 'TOGGLE_SWITCH'; payload: { [key: string]: boolean } };

interface NotificationContextProps {
    state: NotificationState;
    dispatch: Dispatch<NotificationAction>;
}

const initialState: NotificationState = {
    stopAll: false,
    quiteMode: false,
    groupNotifications: false,
    messages: false,
    birthdayNotifications: false,
    fromHappenHub: false,
};

const reducer = (state: NotificationState, action: NotificationAction): NotificationState => {
    switch (action.type) {
        case 'TOGGLE_SWITCH':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <NotificationContext.Provider value={{ state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationProvider, NotificationContext };
