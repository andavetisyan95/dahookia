import Grid from '@mui/material/Grid';
import { ReactNode } from 'react';

interface FooterColumnProps {
  children: ReactNode;
  xs?: number | 'auto' | boolean;
  sm?: number | 'auto' | boolean;
  md?: number | 'auto' | boolean;
  lg?: number | 'auto' | boolean;
  xl?: number | 'auto' | boolean;
  [key: string]: unknown;
}

const FooterColumn = ({
  children,
  xs = 12,
  sm,
  md,
  lg,
  xl,
  ...props
}: FooterColumnProps) => {
  const gridProps = {
    item: true,
    xs,
    sm,
    md,
    lg,
    xl,
    ...props
  };

  return (
    <Grid {...gridProps}>
      {children}
    </Grid>
  );
};

export default FooterColumn;
