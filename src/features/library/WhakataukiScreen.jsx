// import React from "react"
// import { FlatList, Text, ActivityIndicator } from "react-native"

// import PageShell from "../../components/layout/PageShell"
// import Section from "../../components/layout/Section"
// import Card from "../../components/Card"
// import { globalStyles } from "../../theme/globalStyles"

// import { useWhakatauki } from "../hooks/useWhakatauki"

// export default function WhakataukiScreen() {
//   const { whakatauki, loading, error } = useWhakatauki()

//   return (
//     <PageShell>
//       <Section title="Whakataukī">
//         {loading && <ActivityIndicator />}

//         {error && (
//           <Text style={globalStyles.mutedText}>
//             Unable to load whakataukī right now.
//           </Text>
//         )}

//         {!loading && !error && whakatauki.length === 0 && (
//           <Text style={globalStyles.mutedText}>
//             No whakataukī available yet.
//           </Text>
//         )}

//         {!loading && !error && (
//           <FlatList
//             data={whakatauki}
//             keyExtractor={(item) => String(item.id)}
//             renderItem={({ item }) => (
//               <Card>
//                 <Text style={globalStyles.text}>{item.text}</Text>
//                 {item.translation && (
//                   <Text style={globalStyles.mutedText}>
//                     {item.translation}
//                   </Text>
//                 )}
//               </Card>
//             )}
//           />
//         )}
//       </Section>
//     </PageShell>
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
