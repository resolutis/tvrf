import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Button,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar.tsx';
import Footer from '../components/Footer';

const drawerWidth = 240;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ minHeight: '70px', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AssessmentIcon sx={{ fontSize: 32 }} />
              <Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Technical Value Review Framework
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    letterSpacing: '0.5px',
                  }}
                >
                  Enterprise Technology Assessment
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                {username?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                {username}
              </Typography>
            </Box>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: (theme) => theme.zIndex.drawer,
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: '70px',
          mb: '64px',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
} 