import React, { useState, useEffect } from 'react';
import { ChakraProvider, Button, HStack, Box, IconButton, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { DownloadIcon, SettingsIcon, InfoIcon, ChevronDownIcon } from '@chakra-ui/icons';
import MorphingTextSVG from '../components/MorphingTextSVG';
import theme from '../../theme';
import './Landing.css';

const Landing = () => {


    return (
        <ChakraProvider theme={theme}>
            <Box className="landing-container">
                <Box className="svg-container">
                    <MorphingTextSVG />
                </Box>
                <Flex className="button-section">
                    <HStack spacing={2} className="left-buttons">
                        <Menu>
                            <MenuButton
                                as={Button}
                                leftIcon={<DownloadIcon />}
                                rightIcon={<ChevronDownIcon />}
                                className="landing-button"
                                bg="orange.500"
                                color="white"
                                borderRadius="full"
                                _hover={{ bg: 'orange.400' }}
                                _active={{ bg: 'orange.600' }}
                                aria-label="Download"
                                display={['none', 'flex']}
                            >
                                Download
                            </MenuButton>
                            <MenuList zIndex="10" bg="gray.800" color="gray.800" borderRadius="md">
                                <MenuItem _hover={{ bg: 'white' }}>macOS</MenuItem>
                                <MenuItem _hover={{ bg: 'white' }}>Linux</MenuItem>
                                <MenuItem _hover={{ bg: 'white' }}>Windows</MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<DownloadIcon />}
                                className="landing-button"
                                bg="orange.500"
                                color="white"
                                borderRadius="full"
                                _hover={{ bg: 'orange.400' }}
                                _active={{ bg: 'orange.600' }}
                                aria-label="Download"
                                display={['flex', 'none']}
                            />
                            <MenuList zIndex="10" bg="gray.800" color="gray.800" borderRadius="md">
                                <MenuItem _hover={{ bg: 'white' }}>macOS</MenuItem>
                                <MenuItem _hover={{ bg: 'white' }}>Linux</MenuItem>
                                <MenuItem _hover={{ bg: 'white' }}>Windows</MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuButton
                                as={Button}
                                leftIcon={<SettingsIcon />}
                                rightIcon={<ChevronDownIcon />}
                                className="landing-button"
                                bg="purple.500"
                                color="white"
                                borderRadius="full"
                                _hover={{ bg: 'purple.400' }}
                                _active={{ bg: 'purple.600' }}
                                aria-label="Setup"
                                display={['none', 'flex']}
                            >
                                Setup
                            </MenuButton>
                            <MenuList zIndex="10" bg="gray.800" color="gray.800" borderRadius="md">
                                <MenuItem _hover={{ bg: 'white' }}>macOS</MenuItem>
                                <MenuItem _hover={{ bg: 'white' }}>Linux</MenuItem>
                                <MenuItem _hover={{ bg: 'white' }}>Windows</MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<SettingsIcon />}
                                className="landing-button"
                                bg="purple.500"
                                color="white"
                                borderRadius="full"
                                _hover={{ bg: 'purple.400' }}
                                _active={{ bg: 'purple.600' }}
                                aria-label="Setup"
                                display={['flex', 'none']}
                            />
                            <MenuList zIndex="10" bg="gray.800" color="gray.800" borderRadius="md">
                                <MenuItem _hover={{ bg: 'white' }}>macOS</MenuItem>
                                <MenuItem _hover={{ bg: 'white' }}>Linux</MenuItem>
                                <MenuItem _hover={{ bg: 'white' }}>Windows</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                    <Box className="right-button">
                        <Button
                            leftIcon={<InfoIcon />}
                            className="landing-button"
                            bg="teal.500"
                            color="white"
                            borderRadius="full"
                            _hover={{ bg: 'teal.400' }}
                            _active={{ bg: 'teal.600' }}
                            aria-label="About"
                            display={['none', 'flex']}
                        >
                            About
                        </Button>
                        <IconButton
                            icon={<InfoIcon />}
                            className="landing-button"
                            bg="teal.500"
                            color="white"
                            borderRadius="full"
                            _hover={{ bg: 'teal.400' }}
                            _active={{ bg: 'teal.600' }}
                            aria-label="About"
                            display={['flex', 'none']}
                        />
                    </Box>
                </Flex>
            </Box>
        </ChakraProvider>
    );
};

export default Landing;
