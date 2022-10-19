import React, { useEffect, useState } from 'react';
import { fetchImages } from 'shares/fetchApiImages';
import Modal from 'components/Modal';
import Searchbar from '../Searchbar';
import Loader from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import { ImageGalleryWrapper } from './ImageGallery.styled';

export default function ImageGallery() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }
    const searchImages = async () => {
      setLoading(true);
      try {
        const data = await fetchImages(search, page);
        setImages(prevImg => [...prevImg, ...data.hits]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    searchImages(search, page);
  }, [page, search]);

  const handleSubmit = e => {
    e.preventDefault();
    const nextSearch = e.target.elements.search.value;
    if (search === nextSearch) {
      return;
    }
    setPage(1);
    setSearch(nextSearch);
    setImages([]);
  };

  const onClickImage = imgUrl => {
    toggleModal();
    setLargeImgUrl(imgUrl);
  };

  const toggleModal = () => {
    setOpenModal(prevOpenModal => !prevOpenModal);
    setLargeImgUrl(null);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const isImages = Boolean(images.length);

  return (
    <ImageGalleryWrapper>
      {openModal && (
        <Modal largeImgUrl={largeImgUrl} toggleModal={toggleModal} />
      )}
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <p>Something wrong</p>}
      {isImages && (
        <ImageGalleryItem items={images} onClickImage={onClickImage} />
      )}
      {images.length !== 0 && <Button loadMore={loadMore} />}
    </ImageGalleryWrapper>
  );
}
