import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";

const FloatButton = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        fabStyle={{
          marginBottom: 70,
          borderRadius: 50,
          backgroundColor: "#E86188",
        }}
        color="#fff"
        visible
        icon={open ? "chevron-up" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add task",
            onPress: () => console.log("Pressed add"),
          },

          {
            icon: "calendar",
            label: "schedule",
            onPress: () => console.log("Pressed email"),
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
