import React, { FC } from 'react';

export interface WillRenderProps {
  when: boolean;
  children?: React.ReactNode;
}

const WillRender: FC<WillRenderProps> = props => {
  const { when, children } = props;
  return when ? <>{children}</> : null;
};

export default WillRender;
