/**
 * Reusable alert helpers for common user actions and feedback.
 */

import { Alert } from "react-native";

/**
 * Shows a confirmation alert before deleting an entity.
 *
 * @param entityName - The name of the entity being deleted.
 * @param onConfirm - Callback executed when the deletion is confirmed.
 */
export const confirmDelete = (
  entityName: string,
  onConfirm: () => Promise<void>
) => {
  Alert.alert(
    `Delete ${entityName}?`,
    `Are you sure you want to delete this ${entityName.toLowerCase()}?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onConfirm,
      },
    ]
  );
};


/**
 * Shows a confirmation alert before discarding unsaved changes.
 * 
 * @param onConfirm - Callback executed when the deletion is confirmed.
 */
export const confirmDiscard = (
  onConfirm: () => void
) => {
  Alert.alert(
    'Discard changes?',
    'Any unsaved changes will be lost.',
    [
      {
        text: 'Keep Editing',
        style: 'cancel',
      },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: onConfirm,
      },
    ]
  );
};


/**
 * Shows a success alert and runs a callback when confirmed.
 * 
 * @param message - The success message to display.
 * @param onConfirm - Callback executed when the alert is confirmed.
 */
export const showSuccess = (
  message: string,
  onConfirm: () => void
) => {
  Alert.alert(
    'Success!',
    message,
    [
      {
        text: "OK",
        onPress: onConfirm,
      },
    ]
  )
}


/**
 * Shows an error alert with a message.
 *
 * @param message - The error message to display.
 */
export const showError = (
  message: string
) => {
  Alert.alert(
    'Unexpected Error',
    message
  );
};