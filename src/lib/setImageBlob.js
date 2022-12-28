import noAuthAxios from '../axios/noAuthAxios';
import gif from '../assets/img/404_Image.gif';
async function setImageBlob({ route, targetRef, imgKey }) {
  try {
    const { data: blob } = await noAuthAxios.get(`/${route}/${imgKey}`, {
      responseType: 'blob',
    });
    if (blob) {
      // when user navigates to another page
      // but this code doesnt run in sync
      // and tries to access dom which is not present then
      // if (targetRef?.current?.src)
      targetRef.current.src = URL.createObjectURL(blob);
    }
  } catch (err) {
    if (err?.response?.status === 410) targetRef.current.src = gif;
  }
}
export default setImageBlob;
