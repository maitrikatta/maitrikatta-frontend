import { useEffect } from 'react';
import { useGlobalContext } from '../context';
import observeLastDiv from './infinte-scroll';

function useObserveLastDiv(myRef, makeRequest) {
  const { posts, setPageNo, pageNo } = useGlobalContext();
  useEffect(() => {
    if (posts.length > 0) {
      observeLastDiv(myRef.current.lastChild).then((res) => {
        if (res === 'LOAD MORE') {
          // posts length not multiple of 10 must indicate end.
          if (!(posts.length % 10)) setPageNo(posts.length / 10 + 1);
        }
      });
    }
    // restart the common state, when user navigates
    return () => {
      setPageNo(1);
    };
  }, [posts]);
  useEffect(() => {
    console.log(pageNo);
    if (pageNo > 1) makeRequest(pageNo);
  }, [pageNo]);
}

export default useObserveLastDiv;
