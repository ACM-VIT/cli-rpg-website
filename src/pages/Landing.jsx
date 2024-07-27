import React, { useState, useEffect } from 'react';
import { ChakraProvider, Button, HStack, Box, IconButton, Flex, VStack, useDisclosure, Text } from '@chakra-ui/react';
import { DownloadIcon, SettingsIcon, InfoIcon, CloseIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import MorphingTextSVG from '../components/MorphingTextSVG';
import theme from '../../theme';
import './Landing.css';

const Landing = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [scrollY, setScrollY] = useState(0);
    const [detectedOS, setDetectedOS] = useState('');

    const handleScroll = () => {
        if (isOpen) {
            setScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        // Detect OS
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("win") > -1) setDetectedOS("Windows");
        else if (userAgent.indexOf("mac") > -1) setDetectedOS("macOS");
        else if (userAgent.indexOf("linux") > -1) setDetectedOS("Linux");
        else setDetectedOS("Unknown");

        if (isOpen) {
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
            setScrollY(0);
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    return (
        <ChakraProvider theme={theme}>
            <Box className="landing-container">
                <Box className="svg-container">
                    <MorphingTextSVG />
                </Box>
                <Flex className="button-section">
                    <HStack spacing={2} className="left-buttons">
                        <Button
                            leftIcon={<DownloadIcon />}
                            className="landing-button"
                            bg="orange.500"
                            color="white"
                            borderRadius="full"
                            _hover={{ bg: 'orange.600' }}
                            _active={{ bg: 'orange.700' }}
                            aria-label="Download"
                            onClick={onToggle}
                            display={['none', 'flex']}
                        >
                            Download
                        </Button>
                        <IconButton
                            icon={<DownloadIcon />}
                            className="landing-button"
                            bg="orange.500"
                            color="white"
                            borderRadius="full"
                            _hover={{ bg: 'orange.600' }}
                            _active={{ bg: 'orange.700' }}
                            aria-label="Download"
                            onClick={onToggle}
                            display={['flex', 'none']}
                        />
                        {/* Setup button remains unchanged */}
                    </HStack>
                    <Box className="right-button">
                        {/* About button remains unchanged */}
                    </Box>
                </Flex>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: '#ED8936', // orange.500
                                zIndex: 10,
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                                bg="orange.500"
                                transform={`translateY(${scrollY * 0.3}px)`}
                                transition="transform 0.1s ease-out"
                            />
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                zIndex={1}
                            >
                                <IconButton
                                    icon={<CloseIcon />}
                                    position="absolute"
                                    top={4}
                                    right={4}
                                    onClick={onToggle}
                                    aria-label="Close"
                                    bg="white"
                                    color="orange.500"
                                    _hover={{ bg: 'gray.100' }}
                                />
                                <VStack spacing={8}>
                                    <Button
                                        size="lg"
                                        width="200px"
                                        bg="white"
                                        color="orange.500"
                                        _hover={{ bg: 'gray.100' }}
                                    >
                                        Download for {detectedOS}
                                    </Button>
                                    <Text fontSize="sm" color="white">
                                        Not on {detectedOS}? Download for:
                                    </Text>
                                    <HStack spacing={4}>
                                        {['Windows', 'macOS', 'Linux'].filter(os => os !== detectedOS).map(os => (
                                            <Button
                                                key={os}
                                                size="sm"
                                                variant="outline"
                                                color="white"
                                                borderColor="white"
                                                _hover={{ bg: 'orange.600' }}
                                            >
                                                {os}
                                            </Button>
                                        ))}
                                    </HStack>
                                </VStack>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </ChakraProvider>
    );
};

export default Landing;