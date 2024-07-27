import React, { useState, useEffect } from 'react';
import { ChakraProvider, Button, HStack, Box, IconButton, Flex, VStack, useDisclosure, Text } from '@chakra-ui/react';
import { DownloadIcon, CloseIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import DownloadMorphing from '../components/DownloadMorphing';
import theme from '../../theme';
import './Landing.css';
import MorphingTextSVG from '../components/MorphingTextSVG';

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
        // Detect OS
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
            <Box className="landing-container" position="relative" overflow="hidden">
                <Box className="svg-container">
                    <MorphingTextSVG />
                </Box>
                <Flex className="button-section" justifyContent="center">
                    <Button
                        leftIcon={<DownloadIcon />}
                        className="landing-button"
                        bg="orange.500"
                        color="white"
                        borderRadius="md"
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
                                zIndex: 10,
                                overflow: 'hidden',
                            }}
                        >
                            <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={-1}>
                                <DownloadMorphing /> {/* Added the morphing text as background */}
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
                                bg="rgba(0, 0, 0, 0)" // Adding a semi-transparent overlay for readability
                            >
                                <IconButton
                                    icon={<CloseIcon />}
                                    position="absolute"
                                    top={4}
                                    right={4}
                                    onClick={onToggle}
                                    aria-label="Close"
                                    bg="black"
                                    color="orange.500"
                                    _hover={{ bg: 'gray.100' }}
                                />
                                <VStack spacing={8} alignItems="center">
                                    <Button
                                        size="lg" // Changed size to lg
                                        width={{ base: '80%', md: '500px' }} // Responsive width
                                        height={{ base: '60px', md: '80px' }} // Responsive height
                                        fontSize={{ base: '20px', md: '30px' }} // Responsive font size
                                        bg="black"
                                        color="orange.500"
                                        borderRadius="full"
                                        _hover={{ bg: 'white' }}
                                        _active={{ bg: 'gray.800' }}
                                        shadow="lg"
                                        px={{ base: 20, md: 20 }} // Responsive padding
                                    >
                                        Download for {detectedOS}
                                    </Button>
                                </VStack>
                                <Box position="absolute" bottom={20} width="100%" textAlign="center">
                                    <Text fontSize="sm" color="black">
                                        Not on {detectedOS}? Download for:
                                    </Text>
                                    <HStack spacing={4} justifyContent="center" mt={4}>
                                        {['Windows', 'macOS', 'Linux'].filter(os => os !== detectedOS).map(os => (
                                            <Button
                                                key={os}
                                                size="md"
                                                variant="outline"
                                                color="black"
                                                borderColor="black"
                                                _hover={{ bg: 'black', color: 'white' }}
                                            >
                                                {os}
                                            </Button>
                                        ))}
                                    </HStack>
                                </Box>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </ChakraProvider>
    );
};

export default Landing;
