import noAuthAxios from '../axios/noAuthAxios';
async function setImageBlob({ route, targetRef, imgKey }) {
  const { data: blob } = await noAuthAxios.get(`/${route}/${imgKey}`, {
    responseType: 'blob',
  });
  if (blob) {
    // works for img target
    targetRef.current.src = URL.createObjectURL(blob);
  }
}
export default setImageBlob;
