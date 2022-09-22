import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = (email, password) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async () => {
    setError(null);
    setIsPending(true);

    //sign out user
    try {
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      // dispatch logout action
      dispatch({ type: 'LOGIN', payload: response.user });
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return setIsCancelled(true);
  }, []);
  return { login, error, isPending };
};
