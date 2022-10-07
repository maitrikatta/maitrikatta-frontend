import { useGlobalContext } from '../context';
import customAxios from '../axios/authAxios';
import { useNavigate } from 'react-router-dom';
const useFetchData = async (url) => {
  const { setPosts, posts } = useGlobalContext();
  const navigate = useNavigate();
  if (posts.length > 10) {
    try {
      const { data } = await customAxios.get(url);
      setPosts(data);
      console.log(data.length);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate('/login', { replace: true });
      } else {
        console.log(error);
      }
    }
  }
};

export default useFetchData;
