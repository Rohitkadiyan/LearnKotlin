import { MMKV } from 'react-native-mmkv';

//create a refrerense of Storage
export const storage = new MMKV({
    id: 'mmkv_id',
    encryptionKey:'aberd12332sddsd',
});
