import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
    setItem: async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error setting item in storage', error);
        }
    },
    getItem: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            console.log('see=>>', value);
            return JSON.parse(value!);
        }       catch (error) { 
            console.error('Error getting item from storage', error);
            return null;
        }
    },
    removeItem: async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from storage', error);
        }
    },  
}

export default Storage;