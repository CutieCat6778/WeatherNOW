import React, { useEffect, useState } from 'react'
import Error from '../../components/utils/Error'
import { Heading, Text } from '@chakra-ui/layout'
import { Button, Box } from '@chakra-ui/react';
import { DashboardPage } from '../Dashboard';

export function Landing({
    history
}) {
    try {
        const [geolocation, setGeolocation] = useState();

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                setGeolocation({ error: "Geolocation is not supported by this browser." });
            }
        }

        function showPosition(position) {
            setGeolocation({
                "lat": position.coords.latitude,
                "long": position.coords.longitude,
                "error": null
            })
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setGeolocation({ error: "User denied the request for Geolocation.", code: "", detail: null })
                    break;
                case error.POSITION_UNAVAILABLE:
                    setGeolocation({ error: "Location information is unavailable.", code: "", detail: null })
                    break;
                case error.TIMEOUT:
                    setGeolocation({ error: "The request to get user location timed out.", code: "", detail: null })
                    break;
                case error.UNKNOWN_ERROR:
                    setGeolocation({ error: "An unknown error occurred.", code: "", detail: null })
                    break;
            }
        }

        useEffect(() => {
            geolocation ? null : getLocation();
            console.log(geolocation);
        })
        
        if (geolocation && !geolocation.error) {
            return (
                <DashboardPage geolocation={geolocation} />
            )
        } else if (geolocation && geolocation.error) {
            console.log(geolocation)
            return (
                <Error error={new Error(geolocation.error)} />
            )
        }

        return (
            <Box>
                <Heading>
                    Redirecting
                </Heading>
                <Text>
                    Please allow the website to access your GPS, so it can get the most accurate weather location data.
                </Text>
                <Button onClick={getLocation}>
                    Continue
                </Button>
            </Box>
        )
    } catch (e) {
        return (
            <Error error={e} />
        )
    }
}

export default Landing