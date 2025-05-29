import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Grid,
} from '@mui/material';
import type { Pillar } from '../types/tvrf';
import GrafanaEmbed from './GrafanaEmbed';

interface PillarDashboardProps {
  pillar: Pillar;
  grafanaBaseUrl?: string;
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

export default function PillarDashboard({ pillar, grafanaBaseUrl }: PillarDashboardProps) {
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
            <Grid key={index} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
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
                  {metric.grafana && grafanaBaseUrl && (
                    <Box sx={{ mt: 2 }}>
                      <GrafanaEmbed
                        config={metric.grafana}
                        baseUrl={grafanaBaseUrl}
                        title={`${metric.name} Graph`}
                      />
                    </Box>
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