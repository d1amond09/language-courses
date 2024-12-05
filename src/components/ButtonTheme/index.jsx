import { useColorMode } from '@chakra-ui/react';
import classes from './ButtonTheme.module.css'
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function ButtonTheme(){
  const { colorMode, toggleColorMode } = useColorMode();
  return(
      <button 
        className={`${classes.buttontheme} ${colorMode === 'light' ? classes.light : classes.dark}`}
        onClick={toggleColorMode}
      >
      {colorMode === 'light' ? <MoonIcon boxSize={6} /> : <SunIcon boxSize={6} />}
    </button>
  );
}