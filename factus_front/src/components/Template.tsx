import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Box,
  Input,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useNostr } from '../contexts/useNostr';

import ProfileWallet from "../components/ProfileWallet";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 20 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('#2F2D3A', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 20 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text 
          display={{ base: 'none', md: 'flex' }}
          fontSize="2xl" color="#FF8F00" fontFamily="monospace" fontWeight="bold">
          F
        </Text>
        <Text 
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl" color="#FF8F00" fontFamily="monospace" fontWeight="bold">
          Factus
        </Text>
        <CloseButton color="white" display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={()=>{
          if (link.name === "Home") {
            navigate('/')
          }
        }}>
        {" "}   
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        color="white"
        cursor="pointer"
        _hover={{
          bg: '#FF8F00',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {

  const nostr = useNostr();
  const navigate = useNavigate();

  return (
    <Flex
      ml={{ base: 0, md: 20 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        F
      </Text>

      <Input
        display={{ base: 'none', md: 'flex' }}
        placeholder="Search"
        size="md"
        maxWidth="200px"
        type="search"
      />

      <Box display="flex" alignItems="center">
      
        <Button
          onClick={() => { 
            navigate('/writearticle')
          }}
          colorScheme='blue'
          ml={2}
          mr={2}
        >Write an article</Button>

        <HStack outline="none" spacing={{ base: '0', md: '6' }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://bit.ly/broken-link'
                    }
                  />

                  <VStack
                    alignItems="flex-start"
                    spacing="1px"
                    mr="2">
                    <Text letterSpacing={2} fontSize="sm">Profile</Text>

                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }} m={1}>
                    <FiChevronDown />
                  </Box>
                  
                </HStack>
                
              </MenuButton>
              
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <div>
                  <b>NoStr</b>: {nostr?.nostrAccountKeypair?.pubKey.slice(0, 4)}...{nostr?.nostrAccountKeypair?.pubKey.slice(nostr?.nostrAccountKeypair?.pubKey.length - 4)}
                </div>
                <MenuDivider />
                <div>
                  <ProfileWallet />
                </div>
                {/*<MenuDivider />
                <MenuItem>Sign out</MenuItem>*/}
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Box>
    </Flex>
  );
};