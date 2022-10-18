import React from 'react';
import PropTypes from 'prop-types';
import {
    Header,
    SearchForm,
    SearchFormButton,
    SearchFormInput,
} from './Searchbar.styled';
import { IconContext } from 'react-icons';
import { ImSearch } from 'react-icons/im';

export default function Searchbar({ onSubmit }) {
    return (
        <Header>
            <SearchForm onSubmit={onSubmit}>
                <SearchFormButton type="submit">
                    <IconContext.Provider
                        value={{ color: '#3f51b5', size: '30px' }}
                    >
                        <ImSearch />
                    </IconContext.Provider>
                </SearchFormButton>

                <SearchFormInput
                    type="text"
                    name="search"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </SearchForm>
        </Header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
