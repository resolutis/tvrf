import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import type { GrafanaConfig } from '../types/tvrf';

interface GrafanaEmbedProps {
  config: GrafanaConfig;
  baseUrl: string;
  title?: string;
}

export default function GrafanaEmbed({ config, baseUrl, title }: GrafanaEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const updateIframeSize = () => {
      if (iframeRef.current) {
        const width = config.width || iframeRef.current.parentElement?.clientWidth || 800;
        const height = config.height || 300;
        iframeRef.current.style.width = `${width}px`;
        iframeRef.current.style.height = `${height}px`;
      }
    };

    updateIframeSize();
    window.addEventListener('resize', updateIframeSize);
    return () => window.removeEventListener('resize', updateIframeSize);
  }, [config.width, config.height]);

  const buildGrafanaUrl = () => {
    const params = new URLSearchParams({
      orgId: '1',
      from: config.from || 'now-6h',
      to: config.to || 'now',
      theme: config.theme || 'light',
      panelId: config.panelId.toString(),
    });

    if (config.refresh) {
      params.append('refresh', config.refresh);
    }

    return `${baseUrl}/d-solo/${config.dashboardUid}?${params.toString()}`;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      {title && (
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
      )}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: config.height || 300,
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        <iframe
          ref={iframeRef}
          src={buildGrafanaUrl()}
          style={{
            border: 'none',
            width: '100%',
            height: '100%',
          }}
          title={title || 'Grafana Dashboard'}
        />
      </Box>
    </Paper>
  );
} 