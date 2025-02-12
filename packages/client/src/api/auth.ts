import service from '@/lib/http';

export const loginWithEmail = (params: {
    name: string;
    destination: string;
}) => {
    return service.post('/api/auth/login', params);
};

export const loginWithEmailCallback = (params: { token: string }) => {
    return service.get('/api/auth/login/callback', { params });
};

export const getUserProfile = () => {
    return service.get('/api/user/profile');
};

export const logout = () => {
    return service.post('/api/auth/logout');
};
