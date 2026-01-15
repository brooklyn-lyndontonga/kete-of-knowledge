/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from "../../app/providers/ThemeProvider"

import { API_URL } from '../../lib/api'

export default function ReflectionTile() {
  const { colors, spacing, radii, typography } = useTheme()
  const [reflection, setReflection] = useState(null)

  async function loadReflection() {
    try {
      const res = await fetch(`${API_URL}/admin/reflection-templates`)
      const data = await res.json()
      setReflection(data[0]) // show newest
    } catch (err) {
      console.log('Reflection error:', err)
    }
  }

  useEffect(() => {
    loadReflection()
  }, [])

  if (!reflection) return null

  return (
    <View style={[styles.tile, { backgroundColor: colors.accent3 }]}>
      <Text style={styles.title}>{reflection.title}</Text>
      <Text style={styles.story}>{reflection.story}</Text>
      <Text style={styles.caption}>{reflection.caption}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  story: {
    color: '#fff',
    marginTop: 6,
  },
  caption: {
    color: '#fff',
    fontStyle: 'italic',
    marginTop: 6,
    fontSize: 12,
  },
})
