import React from 'react';
import PropTypes from 'prop-types';
import {
    ImageGalleryList,
    ImageGalleryItems,
    ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ items, onClickImage }) {
    const elements = items.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
            <ImageGalleryItems
                key={id}
                onClick={() => onClickImage(largeImageURL)}
            >
                <ImageGalleryItemImg src={webformatURL} alt={tags} />
            </ImageGalleryItems>
        );
    });
    return <ImageGalleryList>{elements}</ImageGalleryList>;
}

ImageGalleryItem.propTypes = {
    onClickImage: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ),
};
