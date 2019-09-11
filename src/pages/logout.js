// modules
import Auth from '@modules/auth'

const logout = () => {
    Auth.logout()
    return 'Logging you out...';
};

export default logout;