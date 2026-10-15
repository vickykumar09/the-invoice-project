import { Modal, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import globalStyles from '@/styles/globalStyles'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { gray, green, red } from '@/constants/color-palettes'
import { formatDateString } from '@/utils/date-time/format'
import DatePicker from '@/form/components/DatePicker'
import TextLink from '@/components/ui/TextLink'
import modalStyle from '@/styles/modalStyles'
import ModalHeader from '@/components/headers/ModalHeader'

export default function InvoicePaymentDue({
  issue_date,
  payment_due_date
}: {
  issue_date: string | null
  payment_due_date: string
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [paymentDueDate, setPaymentDueDate] = useState<string>(payment_due_date);

  // Handle Clear - set payment due  date to null in  db
  const handleClear = () => {
    return
  }
  // Handle Save
  const handleSave = () => {
    return;
  }


  // const isOverdue =
  //   paymentStatus !== "paid" &&
  //   paymentDueDate !== null &&
  //   paymentDueDate < today;
  return (
    <View>
      <View style={globalStyles.flex_items_center}>
        <View style={[globalStyles.iconWrapper, {backgroundColor: 'white', borderWidth: 1, borderColor: gray[1]}]}>
          <Ionicons name="calendar-outline" size={26} color={gray[6]}/>
        </View>
        <View style={{ flex: 1}}>
          <View style={globalStyles.flex_items_center_spaced_between}>
            <Text style={{ fontSize: 16, flex: 1, fontWeight: 600 }}>
              Payment Due On
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
          <Text style={{color: gray[6], fontWeight: 400}}>{formatDateString(payment_due_date)}</Text>
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
              header='Payment Due Date'
              onPress={() => setEdit(false)}
            />
            <View style={modalStyle.body}>
              <View>
                <Text style={styles.labelTxt}>Set Payment Due Date</Text>
                <DatePicker
                  value={paymentDueDate}
                  minimumDate={new Date(issue_date ?? '')}
                  onChange={val => setPaymentDueDate(val)}
                />
              </View>
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
  labelTxt: {
    fontSize: 15,
    fontFamily: "NunitoBold",
  }
})