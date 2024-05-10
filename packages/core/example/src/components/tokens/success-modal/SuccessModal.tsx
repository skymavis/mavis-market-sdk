import Button from '@components/common/button/Button';
import Typography from '@components/common/typography/Typography';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import { FC } from 'react';

import styles from './SuccessModal.module.scss';

interface SuccessModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = props => {
  const { title, isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className={styles.successModal}>
                <img className={styles.image} src="/static/icons/success-icon.svg" />
                <Typography size="large">{title}</Typography>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button fullWidth color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
