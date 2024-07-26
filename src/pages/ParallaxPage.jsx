import React from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const ParallaxPage = ({ title, onClose }) => {
    return (
        <Box
            className="parallax-page"
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            height="100vh"
            bg="rgba(0,0,0,0.9)"
            color="white"
            overflowY="scroll"
            zIndex={20}
            transform="translateY(100%)"
            transition="transform 0.5s ease-out"
        >
            <Button
                position="fixed"
                top="20px"
                right="20px"
                onClick={onClose}
                bg="transparent"
                _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            >
                <CloseIcon />
            </Button>
            <VStack spacing={8} align="center" justify="center" minHeight="100vh">
                <Text fontSize="4xl" fontWeight="bold">{title}</Text>
                <Box className="parallax-content" width="100%" paddingX={4}>
                    <Box className="parallax-section" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
                        <Text fontSize="2xl">Section 1</Text>
                    </Box>
                    <Box className="parallax-section" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
                        <Text fontSize="2xl">Section 2</Text>
                    </Box>
                    <Box className="parallax-section" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
                        <Text fontSize="2xl">Section 3</Text>
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
};

export default ParallaxPage;