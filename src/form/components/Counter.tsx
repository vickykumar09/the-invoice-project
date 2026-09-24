import IconBtn from '@/components/IconBtn';
import { gray } from '@/constants/color-palettes';
import globalStyles from '@/styles/globalStyles';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from 'react-native'

type Props = {
  label: string;
  value: string;
  minValue: number;
  maxValue: number;
  step: number;
  onChange: (value: string) => void;
}

export default function Counter({
  label,
  value,
  minValue,
  maxValue,
  step,
  onChange,
}: Props) {
  const increment = () => {
    let updatedValue = Number(value) + step;
    
    if(updatedValue > maxValue) return;
    
    onChange(String(updatedValue))
  }

  const decrement = () => {
    let updatedValue = Number(value) - step;

    if(updatedValue < minValue) return;

    onChange(String(updatedValue))
  }

  return (
    <View style={[ styles.container]}>
      <Text style={styles.labelTxt}>{label}</Text>
      <View style={[globalStyles.flex_items_center, {gap: 12}]}>

        <TextInput
          placeholder="0"
          defaultValue="1"
          style={{textAlign: 'center', flex: 1, backgroundColor: gray[2], paddingVertical: 0, borderRadius: 4, paddingBottom: 2, fontSize: 16, minWidth: 60}}
        />
        <View style={[globalStyles.flex_items_center]}>
          <IconBtn
            icon={FontAwesome}
            name='minus'
            size={18}
            onPress={decrement}
          />

          <IconBtn
            icon={FontAwesome}
            name='plus'
            size={18}
            onPress={increment}
          />

        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderTopWidth: 1,
    borderTopColor: gray[2],
  },
  labelTxt: {
    fontSize: 16,
    fontFamily: 'NunitoBold'
  }
})