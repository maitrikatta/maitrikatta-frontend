import { useGlobalContext } from '../context';
import noAuthAxios from '../axios/noAuthAxios';
import { useNavigate } from 'react-router-dom';
import useObserveLastDiv from './observeLastDiv';
const useFetchData = (url, lastChild) => {
  const { setPosts, posts } = useGlobalContext();
  const navigate = useNavigate();

  const makeRequest = async (pageNo) => {
    try {
      const { data } = await noAuthAxios.get(`${url}?page=${pageNo}`);
      // console.log(data);
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts, ...data];
        return newPosts;
      });
      // console.log(posts);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate('/login', { replace: true });
      } else {
        console.log(error);
      }
    }
  };
  // look for last divJ
  useObserveLastDiv(lastChild, makeRequest);
};

export default useFetchData;
