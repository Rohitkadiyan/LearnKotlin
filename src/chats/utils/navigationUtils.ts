import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

//navigate()
export const navigate = async (routeName: string, params?: object) => {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    }
};
