import React from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const defaultSEOProps = {
  title: 'Campus Hustle - Mary Stuart Hall Marketplace',
  description: 'Connect with talented entrepreneurs at Mary Stuart Hall, Makerere University. Find amazing services from hair braiding to tech solutions, all within your hall community.',
  keywords: 'Mary Stuart Hall, Makerere University, student entrepreneurs, campus marketplace, hair braiding, tech services, academic support, MSH',
  image: '/og-image.jpg',
  url: typeof window !== 'undefined' ? window.location.href : '',
  type: 'website'
};