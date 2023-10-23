import { useTaskStore } from "@store/taskStore";
import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";

const FloatButton = ({ showModal }: { showModal: () => void }) => {
  const [state, setState] = React.useState({ open: false });
  const { open } = state;
  const setOpenTaskForm = useTaskStore((v) => v.setOpenTaskForm);

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  return (
    <Portal>
      <FAB.Group
        open={open}
        fabStyle={{
          marginBottom: 70,
          borderRadius: 50,
          backgroundColor: "#2F89FC",
        }}
        color="#fff"
        visible
        icon={open ? "chevron-up" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add task",
            onPress: () => setOpenTaskForm(true),
          },
          {
            icon: "bell",
            label: "Remind",
            onPress: () => console.log("Pressed notifications"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default FloatButton;
