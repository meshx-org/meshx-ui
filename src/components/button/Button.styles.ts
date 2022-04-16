import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    height: 34,
    alignItems: 'center'
  },
  content: {
    alignItems: 'center',
    height: 34,
    flex: 1,
    flexDirection: 'row',
    padding: 3
  },
  gfxBackground: {
    borderRadius: 4,
    height: 34,
    position: 'absolute',
    left: 0
  },
  gfxBorder: {
    height: 34,
    position: 'absolute',
    right: 0,
    left: 0
  },
  gfxOverlay: {
    position: 'absolute',
    zIndex: -1,
    borderRadius: 4,
    right: 0,
    left: 0,
    height: 34
  },
  text: {
    paddingHorizontal: 12,
    fontFamily: 'Open Sans',
    fontSize: 13
  }
})

export default styles
