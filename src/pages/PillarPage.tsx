import { useParams, Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PillarDashboard from '../components/PillarDashboard';
import { getPillarById } from '../services/pillarService';

export default function PillarPage() {
  const { pillarId } = useParams<{ pillarId: string }>();
  
  if (!pillarId) {
    return <Navigate to="/" replace />;
  }

  const pillar = getPillarById(pillarId);

  if (!pillar) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" color="error">
          Pillar not found
        </Typography>
      </Box>
    );
  }

  return <PillarDashboard pillar={pillar} />;
} 