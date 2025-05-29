import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Chip,
} from '@mui/material';
import type { Metric, Pillar } from '../types/tvrf';

interface PillarDashboardProps {
  pillar: Pillar;
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'good':
      return 'success';
    case 'warning':
      return 'warning';
    case 'critical':
      return 'error';
    default:
      return 'primary';
  }
};

export default function PillarDashboard({ pillar }: PillarDashboardProps) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {pillar.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {pillar.description}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {pillar.metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {metric.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {metric.description}
                  </Typography>
                  {metric.value !== undefined && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h4" component="div">
                        {metric.value}
                        {metric.unit && (
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {' '}
                            {metric.unit}
                          </Typography>
                        )}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={metric.value}
                        color={getStatusColor(metric.status) as 'success' | 'warning' | 'error' | 'primary'}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  )}
                  {metric.status && (
                    <Chip
                      label={metric.status.toUpperCase()}
                      color={getStatusColor(metric.status) as 'success' | 'warning' | 'error' | 'primary'}
                      size="small"
                      sx={{ mt: 2 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
} 