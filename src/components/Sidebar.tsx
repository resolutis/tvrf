import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import {
  Assessment,
  Code,
  Security,
  Business,
  TrendingUp,
  Assignment,
  AttachMoney,
  Dashboard,
  Policy,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PILLAR_IDS } from '../types/tvrf';

const pillarItems = [
  {
    id: PILLAR_IDS.BUSINESS_IMPACT,
    name: 'Business Impact Metrics',
    icon: <Assessment />,
  },
  {
    id: PILLAR_IDS.DEV_HEALTH,
    name: 'Development & Deployment Health',
    icon: <Code />,
  },
  {
    id: PILLAR_IDS.SECURITY,
    name: 'Security & Access Management',
    icon: <Security />,
  },
  {
    id: PILLAR_IDS.CONTINUITY,
    name: 'Business Continuity',
    icon: <Business />,
  },
  {
    id: PILLAR_IDS.SALES_PIPELINE,
    name: 'Sales Pipeline Alignment',
    icon: <TrendingUp />,
  },
  {
    id: PILLAR_IDS.EXEC_DECISION,
    name: 'Executive Decision Support',
    icon: <Dashboard />,
  },
  {
    id: PILLAR_IDS.SLA_COMPLIANCE,
    name: 'SLA & Contractual Compliance',
    icon: <Assignment />,
  },
  {
    id: PILLAR_IDS.COST_CONTROL,
    name: 'Cost Control & Optimisation',
    icon: <AttachMoney />,
  },
  {
    id: PILLAR_IDS.POLICY_CONTROL,
    name: 'Policy & Control Effectiveness',
    icon: <Policy />,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflow: 'auto',
        backgroundColor: theme.palette.grey[100],
        height: '100%',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            color: theme.palette.text.primary,
            fontWeight: 'bold'
          }}
        >
          TVRF Pillars
        </Typography>
      </Box>
      <Divider />
      <List>
        {pillarItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => navigate(`/pillar/${item.id}`)}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.grey[200],
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  sx: { color: theme.palette.text.primary },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 