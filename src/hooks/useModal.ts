import { useState } from "react";

/**
 * React hook for managing modal visibility.
 *
 * @returns An object containing:
 * - `visible` - Whether the modal is currently visible.
 * - `openModal` - Opens the modal.
 * - `closeModal` - Closes the modal.
 */
type UseModalReturn = {
  visible: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (): UseModalReturn => {
  const [visible, setVisible] = useState<boolean>(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return {
    visible,
    openModal,
    closeModal,
  };
};