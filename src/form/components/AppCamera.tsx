import { gray, purple, red, rose } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import modalStyle from "@/styles/modalStyles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  CameraMode,
  CameraType,
  CameraView,
  FlashMode,
  FocusMode,
  useCameraPermissions,
} from "expo-camera";
import { Directory, File, Paths } from "expo-file-system";
import { Image } from "expo-image";
import { MaterialIcon } from "expo-router/unstable-native-tabs";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  itemId?: string;
  label: string;
  value: string;
  cameraMode: "scan" | "capture";
  onChange: (val: string) => void;
  onCapture?: (data: any) => void;
  onScanned?: (scanningResult: BarcodeScanningResult) => void;
};

export default function AppCamera({
  itemId,
  label,
  value,
  cameraMode,
  onChange,
  onCapture,
  onScanned,
}: Props) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  // Handle Modal Opening
  const openModal = () => {
    setModalVisible(true);
  };
  // Handle Modal Closing
  const closeModal = () => {
    setModalVisible(false);
  };

  // Camera reference to control CameraView
  const cameraRef = useRef<CameraView>(null);
  const isScanningRef = useRef(false);

  // Camera properties & their handlers
  // const [active, setActive] = useState<boolean>(false) // A boolean that determines whether the camera should be active. Useful in situations where the camera may not have unmounted but you still want to stop the camera session.
  const [animateShutter, setAnimateShutter] = useState<boolean>(false); // A boolean that determines whether the camera shutter animation should be enabled.
  const [autoFocus, setAutoFocus] = useState<FocusMode>("off");
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [torch, setTorch] = useState<boolean>(false);
  const [mirror, setMirror] = useState<boolean>(false);

  // Camera controlling btns
  const cameraControls = [
    {
      icon: "refresh",
      label: facing,
      onPress: () =>
        setFacing((current) => (current === "back" ? "front" : "back")),
    },
    {
      icon: flash === "on" ? "flash-on" : "flash-off",
      label: `Flash ${flash}`,
      onPress: () => setFlash((current) => (current === "on" ? "off" : "on")),
    },
    {
      icon: torch ? "flashlight-on" : "flashlight-off",
      label: `Torch ${torch ? "On" : "Off"}`,
      onPress: () => setTorch((current) => !current),
    },
    {
      icon: mode === "picture" ? "camera" : "video",
      label: `${mode} Mode`,
      onPress: () =>
        setMode((current) => (current === "picture" ? "video" : "picture")),
    },
  ];

  // Preview
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Check camera permissions for app
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button title="grant permission" onPress={requestPermission} />
      </View>
    );
  }

  // Handle Photo Capture
  const takePhoto = async () => {
    console.log("photo taken");
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      setPhotoUri(photo.uri);
      console.log("Photo captured:", photo.uri);
    }
  };

  const savePhotoLocally = async (uri: string, itemId: string) => {
    const itemImagesDirectory = new Directory(Paths.document, "item-images");

    itemImagesDirectory.create({
      intermediates: true,
    });

    const sourceFile = new File(uri);

    const destinationFile = new File(
      Paths.document,
      "item-images",
      `${itemId}.jpg`,
    );

    await sourceFile.copy(destinationFile);

    return destinationFile.uri;
  };

  const usePhoto = async () => {
    if (!photoUri) return;

    const localUri = await savePhotoLocally(photoUri, itemId as string);

    onCapture?.(localUri);

    setModalVisible(false);
  };

  // Handle Scanning
  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    onScanned?.(scanningResult);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        {cameraMode === "scan" && (
          <TextInput
            value={value}
            placeholder={`Enter or Scan ${label}`}
            onChangeText={(text) => onChange(text)}
            style={styles.input}
          />
        )}

        {cameraMode === "capture" && <Text>Upload Image</Text>}

        <View style={styles.iconWrapper}>
          <Pressable
            android_ripple={{ color: "red" }}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="camera" size={28} />
          </Pressable>
        </View>
      </View>

      {/* Modal - To scan & capture  */}
      <Modal
        transparent={true}
        animationType="slide"
        // statusBarTranslucent
        visible={isModalVisible}
      >
        <View style={modalStyle.overlay}>
          <View style={styles.modalContent}>
            {/* Preview */}
            {photoUri ? (
              <View style={styles.previewContainer}>
                <Text>Image Preview</Text>
                <Image
                  source={{ uri: photoUri }}
                  style={styles.preview}
                  resizeMode="contain"
                />
                <View style={globalStyles.flex_items_center_spaced_between}>
                  <TouchableOpacity
                    onPress={() => setPhotoUri(null)}
                    style={styles.button}
                  >
                    <Text style={styles.text}>Retake</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text onPress={usePhoto}>Upload</Text>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1, padding: 20 }}>
                <CameraView
                  ref={cameraRef}
                  active={isModalVisible && !photoUri}
                  animateShutter={animateShutter}
                  autofocus={autoFocus}
                  facing={facing}
                  flash={flash}
                  enableTorch={torch}
                  mirror={mirror}
                  mode={mode}
                  mute={true}
                  onBarcodeScanned={handleBarcodeScanned}
                  onCameraReady={() => console.log("Ready")}
                  onMountError={() => Alert.alert("Something Error Occurred")}
                  style={styles.camera}
                />
                <View style={styles.buttonContainer}>
                  {cameraMode === "capture" && (
                    <TouchableOpacity onPress={takePhoto}>
                      <MaterialIcons name="camera" size={60} color="red" />
                    </TouchableOpacity>
                  )}
                  {cameraMode === "scan" && (
                    <Text
                      style={{
                        fontSize: 18,
                        color: purple[6],
                        fontWeight: 600,
                      }}
                    >
                      Align the barcode within the frame
                    </Text>
                  )}

                  {/* Camera Controlling Btns */}
                  <View style={globalStyles.flex_items_center_spaced_between}>
                    {cameraControls.map((each) => {
                      const { icon, label, onPress } = each;
                      return (
                        <TouchableOpacity
                          key={each.label}
                          style={styles.button}
                          onPress={onPress}
                        >
                          <MaterialIcons
                            name={icon as keyof MaterialIcon}
                            size={24}
                          />
                          <Text style={{}}>{label}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <MaterialIcons name="cancel" size={24} color="red" />
                    <Text style={{ fontSize: 16, fontWeight: 600 }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  container: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: gray[2],
    backgroundColor: gray[0],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  iconWrapper: {
    width: 50,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: gray[1],
    borderLeftWidth: 1.5,
    borderLeftColor: gray[2],
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
    gap: 30,
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
    borderRadius: 12,
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 20,
  },
  preview: {
    borderRadius: 12,
    height: 400,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeBtn: {
    backgroundColor: red[2],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  previewContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: rose[2],
  },
});
