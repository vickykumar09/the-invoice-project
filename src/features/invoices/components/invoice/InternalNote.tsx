import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { gray, green, red } from '@/constants/color-palettes'
import globalStyles from '@/styles/globalStyles'
import TextLink from '@/components/ui/TextLink'
import modalStyle from '@/styles/modalStyles'
import ModalHeader from '@/components/headers/ModalHeader'
import inputStyles from '@/styles/inputStyles'

export default function InvoiceInternalNote({
  internal_note
}: {
  internal_note: string | null
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [internalNote, setInternalNote] = useState<string>(internal_note ?? '');

  // Handle Clear
  const handleClear = () => {
    return
  }

  // Handle Save
  const handleSave = () => {
    return
  }

  // Internal can only be set if invoice is in issued state
  return (
    <View>
      <View style={globalStyles.flex_items_center}>
        <View style={[globalStyles.iconWrapper, {backgroundColor: 'white', borderWidth: 1, borderColor: gray[1]}]}>
          <Ionicons name="document-text-outline" size={26} color={gray[5]}/>
        </View>
        <View style={{ flex: 1}}>
          <View style={globalStyles.flex_items_center_spaced_between}>
            <Text style={{ fontSize: 16, flex: 1, fontWeight: 600 }}>
              Internal Note
            </Text>
            {!edit &&
              <View style={globalStyles.flex_items_center}>
                <Text>Edit</Text>
                <FontAwesome
                  name="pencil"
                  size={14}
                  color={gray[5]}
                  onPress={() => setEdit(true)}
                  style={{marginTop: 3}}
                />
              </View>
            }
          </View>
          <Text style={{color: gray[6], fontWeight: 400}}>No internal note found</Text>
        </View>
      </View>


      {/* Modal - To set payment due date */}
      <Modal
        visible={edit}
        transparent
        statusBarTranslucent
      >
        <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader
              header='Internal Note'
              onPress={() => setEdit(false)}
            />
            <View style={modalStyle.body}>
              <TextInput
                placeholder="write an  iinternal  note"
                style={inputStyles.inputContainer}
                multiline
                numberOfLines={4}
              />
              <View style={[globalStyles.flex_items_center_spaced_between]}>
                <TextLink
                  text='Clear'
                  color={red[5]}
                  size={16}
                  onPress={() => setEdit(false)}
                />
                <TextLink
                  text='Save'
                  color={green[7]}
                  size={16}
                  onPress={() => setEdit(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
})