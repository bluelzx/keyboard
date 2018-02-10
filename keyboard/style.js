/**
 * @desc 页面的样式
 * @author ws
 * @date 2017-11-17
 **/

import { StyleSheet, PixelRatio, Dimensions} from 'react-native'
//import { Window, Size, Color, Radius } from '../../global'

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

const Size = {
  pixel: 1 / PixelRatio.get(),
}

const Radius = {
  default: 4,
}

const Color = {
  // 主色调
  primary: '#3EC9B6',                  // 绿色
}

export const styles = StyleSheet.create({
  difference: {
    marginTop: 10,
    color: 'red'
  },
  forgetView: {
    width: Window.width - 80,
    alignItems: 'flex-end',
  },
  forgetTExt: {
    marginTop: 10,
    color: '#2894ff',
  },
  keyboardRemind: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: '#ababab',
    borderBottomWidth: Size.pixel,
  },
  remindText: {
    fontSize: 18,
    textAlign: 'center',
  },
  keyboardView: {
    marginTop: 30,
    alignItems: 'center',
  },
  keyboardContent: {
    padding: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: Size.pixel,
    borderRadius: 4,
    borderColor: '#ababab',
  },
  keyboardBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (Window.width - 80)/6,
    height: (Window.width - 80)/6,
    borderLeftWidth: Size.pixel,
    borderColor: '#ababab',
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor:'#333',
    borderRadius: 10,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: (Window.width*4)/7,
    borderTopWidth: Size.pixel,
    borderColor: '#eee',
  },
  inputNone: {
    backgroundColor: '#eee',
  },
  inputText: {
    fontSize: 26,
    color: '#333',
    textAlign: 'center',
  },
  inputboard: {
    justifyContent: 'center',
    width: Window.width/3,
    height: (Window.width*1)/7,
    borderLeftWidth: Size.pixel,
    borderBottomWidth: Size.pixel,
    borderColor: '#eee'
  },
  closeBottom: {
    position: 'absolute',
    right: 0,
    marginRight: 12,
    padding: 4,
  },
  modalContent: {
    position: 'absolute',
    width: Window.width,
    backgroundColor: '#fff',
  },
  modalBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
})

export default styles
