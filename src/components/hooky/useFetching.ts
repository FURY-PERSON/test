import { useState } from 'react'; 

export default function useFetching(callBack:Function):[Function, boolean, string]{
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  let fetchData= async function() {
    try {
      setIsLoading(true);
      await callBack();
    } catch {
      setErr(err)
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchData, isLoading, err];
}