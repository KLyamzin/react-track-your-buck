import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        document: null,
        isPending: true,
        success: false,
        error: null,
      };
    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        document: null,
        isPending: false,
        success: false,
        error: action.payload,
      };
    case 'DELETED_DOCUMENT':
      return {
        document: null,
        isPending: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState();

  const ref = projectFirestore.collection(collection);
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add ref
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // delete ref
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT',
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete' });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
