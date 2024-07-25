import React, { useState, useEffect } from 'react';
import { ChakraProvider, Button, HStack, Box, IconButton } from '@chakra-ui/react';
import { DownloadIcon, SettingsIcon, InfoIcon } from '@chakra-ui/icons';
import MorphingTextSVG from '../components/MorphingTextSVG';
import theme from '../../theme';
import './Landing.css';

const Landing = () => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <Box className="landing-container">
                <Box className="svg-container">
                    <MorphingTextSVG isAnimated={isAnimated} />
                </Box>
                <Box className="button-section">
                    <HStack spacing={[2, 4]} className="button-container">
                        <Button
                            leftIcon={<DownloadIcon />}
                            className="landing-button"
                            bg="rgba(255, 153, 0, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(255, 153, 0, 0.2)' }}
                            _active={{ bg: 'rgba(255, 153, 0, 0.3)' }}
                            aria-label="Download"
                            display={['none', 'flex']}
                        >
                            Download
                        </Button>
                        <IconButton
                            icon={<DownloadIcon />}
                            className="landing-button"
                            bg="rgba(255, 153, 0, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(255, 153, 0, 0.2)' }}
                            _active={{ bg: 'rgba(255, 153, 0, 0.3)' }}
                            aria-label="Download"
                            display={['flex', 'none']}
                        />
                        <Button
                            leftIcon={<SettingsIcon />}
                            className="landing-button"
                            bg="rgba(153, 50, 204, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(153, 50, 204, 0.2)' }}
                            _active={{ bg: 'rgba(153, 50, 204, 0.3)' }}
                            aria-label="Setup"
                            display={['none', 'flex']}
                        >
                            Setup
                        </Button>
                        <IconButton
                            icon={<SettingsIcon />}
                            className="landing-button"
                            bg="rgba(153, 50, 204, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(153, 50, 204, 0.2)' }}
                            _active={{ bg: 'rgba(153, 50, 204, 0.3)' }}
                            aria-label="Setup"
                            display={['flex', 'none']}
                        />
                        <Button
                            leftIcon={<InfoIcon />}
                            className="landing-button"
                            bg="rgba(0, 128, 128, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(0, 128, 128, 0.2)' }}
                            _active={{ bg: 'rgba(0, 128, 128, 0.3)' }}
                            aria-label="About"
                            display={['none', 'flex']}
                        >
                            About
                        </Button>
                        <IconButton
                            icon={<InfoIcon />}
                            className="landing-button"
                            bg="rgba(0, 128, 128, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(0, 128, 128, 0.2)' }}
                            _active={{ bg: 'rgba(0, 128, 128, 0.3)' }}
                            aria-label="About"
                            display={['flex', 'none']}
                        />
                    </HStack>
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default Landing;