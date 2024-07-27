import React, { useState, useEffect } from 'react';
import { ChakraProvider, Button, HStack, Box, IconButton, Flex, VStack, useDisclosure, Text } from '@chakra-ui/react';
import { DownloadIcon, CloseIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import MorphingTextSVG from '../components/MorphingTextSVG';
import theme from '../../theme';
import './Landing.css';

const Landing = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [scrollY, setScrollY] = useState(0);
    const [detectedOS, setDetectedOS] = useState('');

    const handleScroll = () => {
        if (isOpen) {
            setScrollY(window.scrollY);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isOpen) {
            onClose();
        }
    };

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("win") > -1) setDetectedOS("Windows");
        else if (userAgent.indexOf("mac") > -1) setDetectedOS("macOS");
        else if (userAgent.indexOf("linux") > -1) setDetectedOS("Linux");
        else setDetectedOS("Unknown");

        if (isOpen) {
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
            setScrollY(0);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <ChakraProvider theme={theme}>
            <Box className="landing-container">
                <Box className="svg-container">
                    <MorphingTextSVG />
                </Box>
                <Flex className="button-section" justifyContent="center">
                    <Button
                        leftIcon={<DownloadIcon />}
                        className="landing-button"
                        bg="black"
                        color="green.400"
                        borderRadius="0"
                        _hover={{ bg: 'blackAlpha.800' }}
                        _active={{ bg: 'blackAlpha.900' }}
                        aria-label="Download"
                        onClick={onToggle}
                        fontFamily="monospace"
                        display={['none', 'flex']}
                        px={8} // Added horizontal padding
                    >
                        Download
                    </Button>
                    <IconButton
                        icon={<DownloadIcon />}
                        className="landing-button"
                        bg="black"
                        color="green.400"
                        borderRadius="0"
                        _hover={{ bg: 'blackAlpha.800' }}
                        _active={{ bg: 'blackAlpha.900' }}
                        aria-label="Download"
                        onClick={onToggle}
                        display={['flex', 'none']}
                    />
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
                                backgroundColor: 'black',
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
                                bg="black"
                                transform={`translateY(${scrollY * 0.3}px)`}
                                transition="transform 0.1s ease-out"
                            >
                            </Box>
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
                                    bg="black"
                                    color="green.400"
                                    _hover={{ bg: 'blackAlpha.800' }}
                                />
                                <VStack spacing={8}>
                                    <Button
                                        size="lg"
                                        width="250px"

                                        color="green.400"
                                        variant="outline"
                                        borderRadius="0"
                                        _hover={{ bg: 'blackAlpha.800' }}
                                        fontFamily="monospace"
                                    >
                                        Download for {detectedOS}
                                    </Button>
                                    <Text fontSize="sm" color="green.400" fontFamily="monospace">
                                        Not on {detectedOS}? Download for:
                                    </Text>
                                    <HStack spacing={4}>
                                        {['Windows', 'macOS', 'Linux'].filter(os => os !== detectedOS).map(os => (
                                            <Button
                                                key={os}
                                                size="sm"
                                                variant="outline"
                                                color="green.400"
                                                borderColor="green.400"
                                                _hover={{ bg: 'blackAlpha.800' }}
                                                borderRadius="0"
                                                fontFamily="monospace"
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
