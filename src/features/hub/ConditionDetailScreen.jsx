// import React from 'react'
// import { View, Text, FlatList, TouchableOpacity } from 'react-native'
// import { useRoute, useNavigation } from '@react-navigation/native'
// import { useSymptoms } from '../hooks/useSymptoms'

// export default function ConditionDetailScreen() {
//   const route = useRoute()
//   const navigation = useNavigation()
//   const { condition } = route.params

//   const { symptoms, loading } = useSymptoms(condition.id)

//   return (
//     <View style={{ flex: 1, padding: 16 }}>
//       <Text style={{ fontSize: 24, marginBottom: 8 }}>{condition.name}</Text>

//       {condition.description && (
//         <Text style={{ marginBottom: 16 }}>{condition.description}</Text>
//       )}

//       <Text style={{ fontSize: 18, marginBottom: 8 }}>Linked symptoms</Text>

//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('SymptomTracker', {
//             conditionId: condition.id,
//           })
//         }
//         style={{ marginBottom: 16 }}
//       >
//         <Text>+ Log symptom for this condition</Text>
//       </TouchableOpacity>

//       {loading ? (
//         <Text>Loading…</Text>
//       ) : symptoms.length === 0 ? (
//         <Text>No symptoms logged yet.</Text>
//       ) : (
//         <FlatList
//           data={symptoms}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View
//               style={{
//                 paddingVertical: 8,
//                 borderBottomWidth: 1,
//                 borderColor: '#eee',
//               }}
//             >
//               <Text>{item.symptom}</Text>
//               <Text style={{ color: '#666' }}>
//                 Severity: {item.severity}/10
//               </Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   )
// }

import React from "react"
import { FlatList, Text, ActivityIndicator } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import Card from "../../components/Card"
import { globalStyles } from "../../theme/globalStyles"

import { useWhakatauki } from "../hooks/useWhakatauki"

export default function WhakataukiScreen() {
  const { whakatauki, loading, error } = useWhakatauki()

  return (
    <PageShell>
      <Section title="Whakataukī">
        {loading && <ActivityIndicator />}

        {error && (
          <Text style={globalStyles.mutedText}>
            Unable to load whakataukī.
          </Text>
        )}

        {!loading && !error && whakatauki.length === 0 && (
          <Text style={globalStyles.mutedText}>
            No whakataukī available.
          </Text>
        )}

        {!loading && !error && (
          <FlatList
            data={whakatauki}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Card>
                <Text style={globalStyles.text}>{item.text}</Text>
                {item.translation && (
                  <Text style={globalStyles.mutedText}>
                    {item.translation}
                  </Text>
                )}
              </Card>
            )}
          />
        )}
      </Section>
    </PageShell>
  )
}
