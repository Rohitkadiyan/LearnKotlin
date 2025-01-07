import React from 'react';
import Screen from '../layout/Screen';
import { NotificationService, ToastService } from '../../screens/main/RNBridge';
import CustomButton from './CustomButton';

const Notification = () => {

    //Show Toast
    const showToast = () => {
        ToastService.showToast('This is a Toast Message');
    };

    //Trigger Notification
    const showNotfication = () => {
        NotificationService.TriggerNotification('Hey Rohit !', 'Good Morning', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ullam suscipit. Sint corporis consequatur veritatis incidunt rem. Hic sint non cumque molestiae est voluptas ducimus sed aut. Velit, qui laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ullam suscipit. Sint corporis consequatur veritatis incidunt rem. Hic sint non cumque molestiae est voluptas ducimus sed aut. Velit, qui laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ullam suscipit. Sint corporis consequatur veritatis incidunt rem. Hic sint non cumque molestiae est voluptas ducimus sed aut. Velit, qui laboriosam.');
    };

    //DownLoad
    const DownLoad = () => {
        NotificationService.showProgressBar('Picture Download', 'Download in progress', 'Download complete');
    };

    return (
        <Screen center={true}>
            <CustomButton onPress={showToast} textColor="white" text="Show Toast" />
            <CustomButton onPress={showNotfication} textColor="white" text="Show Notification" />
            <CustomButton onPress={DownLoad} textColor="white" text="DownLoad" />
        </Screen>
    );
};

export default Notification;
