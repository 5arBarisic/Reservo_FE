import {
    AppBar, Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import React, {useContext} from "react";
import {GitHub, Instagram, Movie, Twitter} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../routes/Paths";
import {AuthContext} from "../../authConfig/Authentication";

const pages = ['Home', 'Explore more', 'Contact us'];
const settings = ['Profile', 'Logout'];

type HeadBarProps = {
    haveNav?: boolean;
    haveBorder?: boolean;

};

const HeadBar = ({haveNav = true, haveBorder = true}: HeadBarProps) => {

        const {token, saveToken} = useContext(AuthContext);
        const navigate = useNavigate();

        const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
        const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

        const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElNav(event.currentTarget);
        };
        const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElUser(event.currentTarget);
        };

        const handleCloseNavMenu = (page: string) => {
            setAnchorElNav(null);
            if (page === 'Home') navigate(Paths.Home);
        };

        const handleCloseUserMenu = (setting: string) => {
            setAnchorElUser(null);
            if (setting === 'Logout') {

                if (saveToken) saveToken();
                navigate(Paths.Home);
            }

            if (setting === 'Profile') {
                navigate(Paths.Profile)
            }
        }

        return (
            // <AppBar sx={{background: "linear-gradient(0deg, rgba(0,0,0,0.1) 50%, rgba(2,0,36,1) 100%)"}} position="static">
            <AppBar sx={{background: "none", boxShadow: haveBorder ? "color" : "none"}} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Movie sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/home"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            RESERVO
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Movie sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            RESERVO
                        </Typography>
                        {haveNav && (<Box
                            className="my-3 px-5 justify-between ml-10 md:border md:rounded-b-3xl  md:rounded-t-md md:border-gray-600 max-w-2xl"
                            sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>)}

                        <Box className=" flex flex-row space-x-2 justify-between"
                             sx={{flexGrow: 0, marginLeft: "auto", marginRight: "0px"}}>
                            <Tooltip title="Open github">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <GitHub fontSize="medium" className="text-white"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Open twitter">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Twitter fontSize="medium" className="text-white"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Open instagram">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Instagram fontSize="medium" className="text-white"/>
                                </IconButton>
                            </Tooltip>
                            <div> {token ?
                                <Box sx={{flexGrow: 0}}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt="User"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '45px'}}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box> : <button
                                    className="rounded-3xl hover:bg-orange-600  border border-gray-600 font-bold text-md w-24 h-10"
                                    onClick={() => {
                                        navigate(Paths.Login);
                                    }}>
                                    Login
                                </button>}
                            </div>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
;

export default HeadBar;