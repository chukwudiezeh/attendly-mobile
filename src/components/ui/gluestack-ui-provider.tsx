import React from 'react';
import { GluestackUIProvider, GluestackUIProviderProps } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

type Props = {
  children: React.ReactNode;
} & Partial<GluestackUIProviderProps>;

export const GluestackUIProviderWrapper = ({ children, ...rest }: Props) => {
  return (
    <GluestackUIProvider config={config} {...rest}>
      {children}
    </GluestackUIProvider>
  );
};