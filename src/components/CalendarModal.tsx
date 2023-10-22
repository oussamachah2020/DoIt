import * as React from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

type Props = {
  visible: boolean;
  hideModal: () => void;
};

const CalendarModal = ({ visible, hideModal }: Props) => {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    position: "absolute",
    top: 0,
    bottom: 0,
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default CalendarModal;
