import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, StatLabel, Switch } from '@chakra-ui/react'
import React from 'react'

export function PopoverMobile({ setConfig, config }) {
    function SwitchMode(){
        const obj = config
        obj.day = obj.day == 1 ? 0 : 1;
        setConfig({...obj})
        console.log(obj)
    }

    return (
        <Flex position="absolute" h="100vh" justifyContent="center" alignItems="center" p={2} flexDir="column" display={{base: "flex", md: "none"}}>
            <Popover autoFocus={false}>
                <PopoverTrigger>
                    <HamburgerIcon boxSize={8} mt={4} color={config.day ? "gray.800" : "white"} />
                </PopoverTrigger>
                <PopoverContent backgroundColor="gray.800" color="white" maxW="200px" ml={4} borderRadius="7px" shadow="2xl" border="none">
                    <PopoverHeader fontWeight="900" fontSize="2.2rem">
                        Settings
                    </PopoverHeader>
                    <PopoverArrow backgroundColor="gray.900" />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Flex mb={6}>
                            <StatLabel mr={4}>Dark Mode</StatLabel>
                            <Switch isChecked={config.day == 1 ? false : true} onChange={SwitchMode}/>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Stack>
                                <StatLabel>{config.dist ? "Kilometers" : "Miles"}</StatLabel>
                                <Switch onChange={() => { setConfig({ ...config, dist: !config.dist }) }} />
                            </Stack>
                            <Stack>
                                <StatLabel>{config.temp ? "Celcius" : "Fahrenheit"}</StatLabel>
                                <Switch onChange={() => { setConfig({ ...config, temp: !config.temp }) }} />
                            </Stack>
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}

export default PopoverMobile