import React from 'react';
import { Tooltip } from '@chakra-ui/react';

const CustomTooltip = ({ label, fontSize = 'sm', color, children }) => {
    return (
        <Tooltip 
            label={label}
            fontSize={fontSize}
            color={color}
            hasArrow
            borderRadius={12}
            p={4}
        >
            {children}
        </Tooltip>
    );
};

export default CustomTooltip;