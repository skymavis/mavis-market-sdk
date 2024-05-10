import { Button as NextUIButton, ButtonProps as NextUIButtonProps, forwardRef } from '@nextui-org/react';
import classNames from 'classnames';

import styles from './Button.module.scss';

const ButtonForwardRefComponent = (props: NextUIButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const { className, color = 'default', ...otherProps } = props;
  return (
    <NextUIButton
      {...otherProps}
      ref={ref}
      color={color}
      className={classNames(className, styles.button, styles[color])}
    />
  );
};

const Button = forwardRef(ButtonForwardRefComponent);

export default Button;
