import React from 'react';
import { Grid } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export default function Loader() {
    return (
        <LoaderWrapper>
            <Grid
                height="150"
                width="150"
                color="#3f51b5"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </LoaderWrapper>
    );
}
