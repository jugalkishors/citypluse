import Storage from "../utils/storage";

export const RegisterUser = async (name: string, email: string, password: string) => {
    try {
        const existingUser = await Storage.getItem('users');
        const isUserExist = existingUser?.some((user: any) => user?.email === email);
        if (isUserExist) {
            return {
                success: false,
                message: 'User with this email already exists',
            }
        }
        
        
        await Storage.setItem('users', JSON.stringify(existingUser ? [...existingUser, { name, email, password }] : [{ name, email, password }]));
        await Storage.setItem('user', JSON.stringify({ name, email, password }));
        return {
            success: true,
            message: 'User registered successfully', 
            data:{ name, email, password }
        }
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const LoginUser = async (email: string, password: string) => {
    try {
        const existingUser = await Storage.getItem('users');
        const user = existingUser?.find((user: any) => user?.email === email && user?.password === password);
        if (user) {
            await Storage.setItem('user', JSON.stringify(user));
            return {
                success: true,
                message: 'Login successful',
                data: user,
            }
        } else {
            return {
                success: false,
                message: 'Invalid email or password',
            }
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

export const GetFavEvents = async () => {
    try {
        const favEvents = await Storage.getItem('favEvents');
        return favEvents || [];
    } catch (error) {
        console.error('Error getting favorite events:', error);
        throw error;
    }
}

export const IsEventInFav = async (eventId: string) => {
    try {
        const favEvents = await Storage.getItem('favEvents');
        const isEventExist = favEvents?.some((favEvent: any) => favEvent?.id === eventId);
        return isEventExist;
    } catch (error) {
        console.error('Error checking favorite event:', error);
        throw error;
    }
}

export const AddToFavEvents = async (event: any) => {
    try {
        const favEvents = await Storage.getItem('favEvents');
        const isEventExist = favEvents?.some((favEvent: any) => favEvent?.id === event?.id);
        if (isEventExist) {
            return {
                success: false,
                message: 'Event already in favorites',
            }
        }
        await Storage.setItem('favEvents', JSON.stringify(favEvents ? [...favEvents, event] : [event]));
        return {
            success: true,
            message: 'Event added to favorites',
        }
    } catch (error) {
        console.error('Error adding favorite event:', error);
        throw error;
    }
}

export const RemoveFromFavEvents = async (eventId: string) => {
    try {
        const favEvents = await Storage.getItem('favEvents');
        const updatedFavEvents = favEvents?.filter((favEvent: any) => favEvent?.id !== eventId);
        await Storage.setItem('favEvents', JSON.stringify(updatedFavEvents));
        return {
            success: true,
            message: 'Event removed from favorites',
        }
    } catch (error) {
        console.error('Error removing favorite event:', error);
        throw error;
    }
}
