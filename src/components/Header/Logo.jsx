import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link to="/">
        <Image boxSize='70px' src='logo.png'/>
      </Link>
    </Box>
  )
}