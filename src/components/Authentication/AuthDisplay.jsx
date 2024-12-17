import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Stack, Button, Avatar, AvatarBadge, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, ListIcon } from '@chakra-ui/react'; 
import useAuth from '../../hooks/useAuth';
import '../../App.css';
import { QuestionIcon, InfoIcon, SettingsIcon, LinkIcon, ArrowBackIcon, ChatIcon, CheckIcon, SearchIcon } from '@chakra-ui/icons';

const AuthDisplay = () => {
  const { user, logout, isAdmin} = useAuth();
  const color = isAdmin() ? "red" : "green";
  const iconForAdmin = isAdmin() ? <SettingsIcon /> : "";
  const name =  isAdmin() ? "" : user?.username;
  return (
    <Box display={'flex'} right={4} top={4} zIndex={1}>
      {user ? ( 
        <Menu>
        <MenuButton p={5} as={Avatar} name={name} icon={iconForAdmin}>
            <AvatarBadge bg={color} boxSize='1.25em' />
        </MenuButton>
        <MenuList>
          <MenuGroup title='Профиль'>
            <MenuItem onClick={logout}> <ArrowBackIcon  mr={2}/> Выйти </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title='Помощь'>
            <MenuItem><Link to="https://github.com/d1amond09/language-courses"><LinkIcon mr={2}/>GitHub</Link></MenuItem>
            <MenuItem><QuestionIcon mr={2}/>FAQ</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      ) : (
          <Link to="/login">
            <Button size="md" colorScheme="teal" variant="solid" width="full">Вход</Button>
          </Link>
      )}
    </Box>
  );
}

export default AuthDisplay;