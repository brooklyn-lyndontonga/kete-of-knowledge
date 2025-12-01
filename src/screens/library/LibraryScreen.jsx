/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
export default function LibraryScreen() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)
      const data = await apiGet("/library")
      setResources(data)
    } catch (err) {
      setError("Failed to load resources")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <Text>Loading…</Text>
  if (error) return <Text>{error}</Text>

  return (
    <FlatList
      data={resources}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("ResourceScreen", { resource: item })}
        >
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  )
}
