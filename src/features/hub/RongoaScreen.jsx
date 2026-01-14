// import React from "react"
// import { FlatList, Text, ActivityIndicator } from "react-native"
// import { useNavigation } from "@react-navigation/native"

// import PageShell from "../../components/layout/PageShell"
// import Section from "../../components/layout/Section"
// import ResourceCard from "./components/ResourceCard"

// import { useResources } from "../hooks/useResources"

// export default function RongoaScreen() {
//   const navigation = useNavigation()
//   const { resources, loading, error } = useResources(1) // Rongoā category

//   return (
//     <PageShell>
//       <Section title="Rongoā Māori">
//         {loading && <ActivityIndicator />}

//         {error && (
//           <Text>Unable to load rongoā right now.</Text>
//         )}

//         {!loading && !error && resources.length === 0 && (
//           <Text>No rongoā resources available.</Text>
//         )}

//         <FlatList
//           data={resources}
//           keyExtractor={(item) => String(item.id)}
//           renderItem={({ item }) => (
//             <ResourceCard
//               title={item.title}
//               summary={item.content}
//               onPress={() =>
//                 navigation.navigate("ResourceDetail", {
//                   resource: item,
//                 })
//               }
//             />
//           )}
//         />
//       </Section>
//     </PageShell>
//   )
// }

import React from "react"
import { FlatList, Text, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import ResourceCard from "./components/ResourceCard"

import { useResources } from "../hooks/useResources"

export default function RongoaScreen() {
  const navigation = useNavigation()
  const { resources, loading, error } = useResources(1) // Rongoā category ID

  return (
    <PageShell>
      <Section title="Rongoā Māori">
        {loading && <ActivityIndicator />}

        {error && <Text>Unable to load rongoā.</Text>}

        {!loading && !error && resources.length === 0 && (
          <Text>No rongoā resources available.</Text>
        )}

        <FlatList
          data={resources}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ResourceCard
              title={item.title}
              summary={item.content}
              onPress={() =>
                navigation.navigate("ResourceDetail", {
                  resource: item,
                })
              }
            />
          )}
        />
      </Section>
    </PageShell>
  )
}
