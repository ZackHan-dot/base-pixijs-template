import service from '@/lib/http';

export const loginWithEmail = (params: {
    name: string;
    destination: string;
}) => {
    return service.post('/api/auth/login', params);
};
