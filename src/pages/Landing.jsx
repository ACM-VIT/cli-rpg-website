import React, { useState, useEffect } from 'react';
import { ChakraProvider, Button, HStack, Box, IconButton, Flex, VStack, useDisclosure, Text } from '@chakra-ui/react';
import { DownloadIcon, CloseIcon, SettingsIcon, InfoIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import DownloadMorphing from '../components/DownloadMorphing';
import theme from '../../theme';
import './Landing.css';
import MorphingTextSVG from '../components/MorphingTextSVG';

const Landing = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollY, setScrollY] = useState(0);
    const [detectedOS, setDetectedOS] = useState('');
    const [currentSection, setCurrentSection] = useState('');

    const handleScroll = () => {
        if (isOpen) {
            setScrollY(window.scrollY);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isOpen) {
            onClose();
            setCurrentSection('');
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

    const handleButtonClick = (section) => {
        setCurrentSection(section);
        onOpen();
    };

    const renderContent = () => {
        switch (currentSection) {
            case 'download':
                return (
                    <VStack spacing={8} alignItems="center">
                        <Button
                            size="lg"
                            width={{ base: '80%', md: '500px' }}
                            height={{ base: '60px', md: '80px' }}
                            fontSize={{ base: '20px', md: '30px' }}
                            bg="black"
                            color="orange.500"
                            borderRadius="full"
                            _hover={{ bg: 'white' }}
                            _active={{ bg: 'gray.800' }}
                            shadow="lg"
                            px={{ base: 20, md: 20 }}
                        >
                            Download for {detectedOS}
                        </Button>
                    </VStack>
                );
            case 'setup':
                return (
                    <VStack spacing={8} alignItems="center">
                        <Text fontSize={{ base: '20px', md: '30px' }} color="purple.500">
                            Setup Instructions
                        </Text>
                        {/* Add additional setup content here */}
                    </VStack>
                );
            case 'about':
                return (
                    <VStack spacing={8} alignItems="center">
                        <Text fontSize={{ base: '20px', md: '30px' }} color="teal.500">
                            About Us
                        </Text>
                        {/* Add additional about content here */}
                    </VStack>
                );
            default:
                return null;
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box className="landing-container" position="relative" overflow="hidden">
                <Box className="svg-container">
                    <MorphingTextSVG />
                </Box>
                <Flex className="button-section" justifyContent="center" spacing={4}>
                    <Button
                        leftIcon={<DownloadIcon />}
                        className="landing-button"
                        bg="orange.500"
                        color="white"
                        borderRadius="md"
                        _hover={{ bg: 'orange.600' }}
                        _active={{ bg: 'orange.700' }}
                        aria-label="Download"
                        onClick={() => handleButtonClick('download')}
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
                        onClick={() => handleButtonClick('download')}
                        display={['flex', 'none']}
                    />
                    <Button
                        leftIcon={<SettingsIcon />}
                        className="landing-button"
                        bg="purple.500"
                        color="white"
                        borderRadius="md"
                        _hover={{ bg: 'purple.600' }}
                        _active={{ bg: 'purple.700' }}
                        aria-label="Setup"
                        onClick={() => handleButtonClick('setup')}
                        display={['none', 'flex']}
                    >
                        Setup
                    </Button>
                    <IconButton
                        icon={<SettingsIcon />}
                        className="landing-button"
                        bg="purple.500"
                        color="white"
                        borderRadius="full"
                        _hover={{ bg: 'purple.600' }}
                        _active={{ bg: 'purple.700' }}
                        aria-label="Setup"
                        onClick={() => handleButtonClick('setup')}
                        display={['flex', 'none']}
                    />
                    <Button
                        leftIcon={<InfoIcon />}
                        className="landing-button"
                        bg="teal.500"
                        color="white"
                        borderRadius="md"
                        _hover={{ bg: 'teal.600' }}
                        _active={{ bg: 'teal.700' }}
                        aria-label="About"
                        onClick={() => handleButtonClick('about')}
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
                        _hover={{ bg: 'teal.600' }}
                        _active={{ bg: 'teal.700' }}
                        aria-label="About"
                        onClick={() => handleButtonClick('about')}
                        display={['flex', 'none']}
                    />
                </Flex>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key={currentSection}
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
                                    onClick={() => {
                                        onClose();
                                        setCurrentSection('');
                                    }}
                                    aria-label="Close"
                                    bg="black"
                                    color="orange.500"
                                    _hover={{ bg: 'gray.100' }}
                                />
                                {renderContent()}
                                {currentSection === 'download' && (
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
                                )}
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </ChakraProvider>
    );
};

export default Landing;
