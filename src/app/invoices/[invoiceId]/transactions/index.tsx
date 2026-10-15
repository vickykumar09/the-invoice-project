import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { InvoiceHero } from '@/features/invoices/components/InvoiceHero';
import globalStyles from '@/styles/globalStyles';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { gray } from '@/constants/color-palettes';
import IconBtn from '@/components/IconBtn';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function InvoiceTransactionsScreen() {
  const { invoiceId } = useLocalSearchParams();
  const transactions = [
    {
      icon: "rupee-sign",
      title: "Payments",
      subtitle: "Review and record payments",
      path: "payments",
    },
    {
      icon: "file-minus",
      title: "Credit Notes",
      subtitle: "Issue and manage credits",
      path: "credit-notes",
    },
    {
      icon: "file-plus",
      title: "Debit Notes",
      subtitle: "Issue and manage debits",
      path: "debit-notes",
    },
    {
      icon: "undo",
      title: "Refunds",
      subtitle: "Process and issue refunds",
      path: "refunds",
    },
  ];
  const router = useRouter();
  return (
    <View>
      <InvoiceHero/>
      <Text>index</Text>
      <View style={styles.container}>
        {transactions.map((each) => {
          const { icon, title, subtitle, path } = each;
          return (
            <View
              key={each.title}
              style={[
                globalStyles.flex_items_center_spaced_between,
                {
                  paddingVertical: 14,
                },
              ]}
            >
              <View style={globalStyles.flex_items_center}>
                <View style={globalStyles.iconWrapper}>
                  {["rupee-sign", "undo"].includes(icon) ? (
                    <FontAwesome5 color={gray[5]} name={icon} size={24} />
                  ) : (
                    <Feather
                      color={gray[5]}
                      name={icon as keyof typeof Feather.glyphMap}
                      size={26}
                    />
                  )}
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 600 }}>
                    {title}
                  </Text>
                  <Text style={{ color: gray[6] }}>{subtitle}</Text>
                </View>
              </View>
              <IconBtn
                icon={Feather}
                name="chevron-right"
                onPress={() => {
                  router.push({
                    pathname: `/invoices/[invoiceId]/transactions/${path}`,
                    params: {
                      invoiceId: invoiceId as string,
                    },
                  });
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
})