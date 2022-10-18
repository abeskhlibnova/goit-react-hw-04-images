import { Component } from 'react';
import { fetchImages } from 'shares/fetchApiImages';
import Modal from 'components/Modal';
import Searchbar from '../Searchbar';
import Loader from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import { ImageGalleryWrapper } from './ImageGallery.styled';

export default class ImageGallery extends Component {
    state = {
        search: '',
        images: [],
        loading: false,
        error: null,
        page: 1,
        openModal: false,
        largeImgUrl: null,
    };

    componentDidUpdate(_, prevState) {
        const { search, page } = this.state;
        if (prevState.search !== search || prevState.page !== page) {
            this.searchImages(search, page);
        }
    }

    async searchImages() {
        const { search, page } = this.state;
        this.setState({
            loading: true,
        });
        try {
            const data = await fetchImages(search, page);
            this.setState(state => {
                return {
                    images: [...state.images, ...data.hits],
                };
            });
        } catch (error) {
            this.setState({
                error,
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const prevSearch = this.state.search;
        const nextSearch = e.target.elements.search.value;
        if (prevSearch === nextSearch) {
            return;
        }
        this.setState({
            page: 1,
            search: nextSearch,
            images: [],
        });
    };

    onClickImage = imgUrl => {
        this.toggleModal();
        this.setState({
            largeImgUrl: imgUrl,
        });
    };

    toggleModal = () => {
        this.setState(state => ({
            openModal: !state.openModal,
            largeImgUrl: null,
        }));
    };

    loadMore = () => {
        this.setState(prevState => {
            return {
                page: prevState.page + 1,
            };
        });
    };

    render() {
        const { images, loading, error, openModal, largeImgUrl } = this.state;
        const { handleSubmit, loadMore, onClickImage, toggleModal } = this;
        const isImages = Boolean(images.length);
        return (
            <ImageGalleryWrapper>
                {openModal && (
                    <Modal
                        largeImgUrl={largeImgUrl}
                        toggleModal={toggleModal}
                    />
                )}
                <Searchbar onSubmit={handleSubmit} />
                {loading && <Loader />}
                {error && <p>Something wrong</p>}
                {isImages && (
                    <ImageGalleryItem
                        items={images}
                        onClickImage={onClickImage}
                    />
                )}
                {images.length !== 0 && <Button loadMore={loadMore} />}
            </ImageGalleryWrapper>
        );
    }
}
