import React, { FC } from 'react'
import { StyleSheet, View, Image, Platform } from 'react-native'
import Button from '../shared/Button'

const styles = StyleSheet.create({
  headerWithoutBg: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerWithBg: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },

  center: {},
  workspace: {
    maxWidth: 180
  },
  user: {
    maxWidth: 180
  },
})

interface IProps {
  hasBg?: boolean
  center: JSX.Element
}

const Header: FC<IProps> = ({ hasBg = false, center }) => {
  const header = (
    <View style={hasBg ? styles.headerWithBg : styles.headerWithoutBg}>
      <View style={styles.workspace}>
        <Button
          type="secondary"
          layout="fill-left"
          text="Vulkan LLC"
          icon={
            <Image
              style={{ borderRadius: 2 }}
              source={{
                width: 26.5,
                height: 26.5,
                uri: 'https://images.unsplash.com/photo-1485724745104-ae0f55940bc1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
              }}
            />
          }
        />
      </View>
      <View style={styles.center}>{center}</View>
      <View style={styles.user}>
        <Button
          type="secondary"
          layout="fill-right"
          text="adsfasdasdf"
          icon={
            <Image
              style={{ borderRadius: 2 }}
              source={{
                width: 26.5,
                height: 26.5,
                uri: 'https://images.unsplash.com/photo-1609379968673-ba7c5fe7a8e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
              }}
            />
          }
        />
      </View>
    </View>
  )

  // Acrilic on supported platforms
  return Platform.select({
    web: (
      <div style={{ backdropFilter: 'blur(20px)', width: '100%' }}>{header}</div>
    ),
    default: header,
  })
}

export default Header
