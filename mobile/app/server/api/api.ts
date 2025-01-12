import { NODE_ENV, EXPO_URL_PRODUCTION, EXPO_URL_DEVELOPMENT } from '@env';

export const api = NODE_ENV !== "production" ? `${EXPO_URL_DEVELOPMENT}` : `${EXPO_URL_PRODUCTION}`