import { Navigate } from 'react-router-dom';
import { PILLAR_IDS } from '../types/tvrf';

export default function HomePage() {
  return <Navigate to={`/pillar/${PILLAR_IDS.BUSINESS_IMPACT}`} replace />;
} 