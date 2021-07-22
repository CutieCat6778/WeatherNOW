import {
    Flex,
} from '@chakra-ui/layout';
import { Spacer } from '@chakra-ui/react';
import React from 'react';

export function AddressFlex({ data }) {
    return (
        <Flex paddingX={4} paddingY={2} justifyContent="space-between">
            {data.address.locality}
            <Spacer/>
            {data.address.countryRegion}
        </Flex>
    )
}

export default AddressFlex;
