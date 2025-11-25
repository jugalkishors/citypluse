import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Returns a function to calculate dynamic width and height based on screen size.
 * @param baseWidth The base width used in design (e.g., 375 for iPhone X)
 * @param baseHeight The base height used in design (e.g., 812 for iPhone X)
 */
/**
 * Get dynamic width based on design size.
 * @param size The width in design pixels.
 * @param baseWidth The base width used in design (default: 375)
 */
export function getWidth(size: number, baseWidth: number = 375) {
    return size * (SCREEN_WIDTH / baseWidth);
}

/**
 * Get dynamic height based on design size.
 * @param size The height in design pixels.
 * @param baseHeight The base height used in design (default: 812)
 */
export function getHeight(size: number, baseHeight: number = 812) {
    return size * (SCREEN_HEIGHT / baseHeight);
}

export const FULL_WIDTH = SCREEN_WIDTH;
export const FULL_HEIGHT = SCREEN_HEIGHT;