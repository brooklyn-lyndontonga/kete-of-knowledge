/* eslint-disable react/prop-types */
import React from "react"
import { ImageBackground, View } from "react-native"

import bgMain from "../../assets/images/kawakawa.png"
import bgSecondary from "../../assets/images/manuka.png"
import bgDeep from "../../assets/images/ponga.png"

const BACKGROUNDS = {
  0: bgMain,
  1: bgSecondary,
  2: bgDeep,
}

export default function BackgroundLayout({ depth = 0, children }) {
  const background = BACKGROUNDS[depth] || BACKGROUNDS[2]

  return (
    <ImageBackground source={background} style={{ flex: 1 }} resizeMode="cover">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        {children}
      </View>
    </ImageBackground>
  )
}
