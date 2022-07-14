import { getDownloadURL, list, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";

export const CopyToClipboard = (id) => {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  export const getAllBackgroundImages = async () => {
    const imagesRef = ref(storage, 'backgroundImages/');
    const res = await listAll(imagesRef)
    let listImages = []

    for (let i = 0; i < res?.items?.length; i++) {
      const url = await getDownloadURL(res?.items[i])
      listImages.push(url)
    }

    return listImages
  }

  export const getRandomBackgroundImages = async () => {
    const listImgs = await getAllBackgroundImages()
    var item = listImgs[Math.floor(Math.random()*listImgs.length)];
    return item
  }

  export const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }