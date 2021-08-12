import React from 'react'
import { View } from 'react-native'
import ControlGraphics from '../shared/ControlGraphics'

const SearchBar = () => {
  return (
    <View>
      <ControlGraphics width={370} backgroundColor="red" />
      <View
        style={{
          zIndex: -1,
          height: 38,
          width: 370,
          backgroundColor: 'white',
          borderRadius: 4.8,
          position: 'absolute',
        }}
      />
    </View>
  )
}

export default SearchBar