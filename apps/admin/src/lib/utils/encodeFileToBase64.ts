const encodeFileToBase64 = (image: File, setImage: (image: any) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  return new Promise(() => {
    reader.onload = () => {
      setImage(reader.result);
    };
  });
};

export default encodeFileToBase64;
