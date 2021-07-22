import {
    Flex,
} from '@chakra-ui/layout';
import { Spacer } from '@chakra-ui/react';
import React from 'react';

export function AddressFlex({ data }) {
    return (
        <Flex paddingY={2} justifyContent="space-between" fontSize={14}>
            {data.address.locality}
            <Spacer/>
            {data.address.countryRegion}
        </Flex>
    )
}

export default AddressFlex;
