import { useContext } from 'react';
import { LoginContext } from './LoginContext';

const useLoginContext = () => {
    const context = useContext(LoginContext);
    return context;
};

export default useLoginContext;
