/**
 * @desc 密码键盘输入
 * @author ws
 * @dete 2017-11-28
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Easing,
  Dimensions,
  Modal,
} from 'react-native'
import styles from './style'

const IconClose = require('./icon-close.png')
const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

// 键盘打乱
function upset() {
  let keyboard = [1,2,3,4,5,6,7,8,9,0]
  keyboard.sort(() => Math.random() > .5 ? -1 : 1)
  keyboard.splice(9,0,'')
  keyboard.push('X')
  return keyboard
}

export default class PayModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,             // 控制modal的显示
      difference: false,          // 两次是否输入的密码不同
      twiceInputMessge: '',       // 第二次输入的提示
      num: [],
      bottom: new Animated.Value(0 - this.props.height),         // 隐藏键盘
    }
    // 键盘
    this.keyboard = [1,2,3,4,5,6,7,8,9,'',0, 'X']
    // 显示6位框
    this.show = [0,1,2,3,4,5]
    // 第一次的输入结果
    this.setOnce = []
  }

  open() {
    // 打开modal的时候打乱键盘
    this.props.upset ? this.keyboard = upset() : null
    this.setState({ visible: true },() => {
      //打开modal后开始动画
      Animated.timing(
        this.state.bottom,
        {
          delay: 50,
          duration: 300,
          easing: Easing.linear(),
          toValue: 0,
        }
      ).start()
    })
  }

  close() {
    // 关闭modal并清空数据
    this.setOnce = []
    // 结束动画
    Animated.timing(
      this.state.bottom,
      {
        delay: 0,
        duration: 300,
        easing: Easing.linear(),
        toValue: 0 - this.props.height,
      }
    ).start()
    //等待动画结束再关闭moadl
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({
        visible: false,
        num: [],
        difference: false,
        twiceInputMessge: '',
      })
    }, 300)
  }

  onSubmit(nums) {
    // 提交操作
    this.props.onSubmit(nums.join(''))
    this.close()
  }

  seletedNumTwice() {
    if(!this.state.twiceInputMessge) {
      this.setOnce = this.state.num,
      this.setState({num: [], twiceInputMessge: '请再次输入'})
    }else {
      if(this.setOnce.join('') === this.state.num.join('')) {
        this.onSubmit(this.setOnce)
      }else {
        this.setOnce = []
        this.setState({
          difference: true,
          twiceInputMessge: '',
          num: [],
        })
      }
    }
  }

  seletedNum(num) {
    if( this.state.num.length <= 5 ) {
      this.state.difference ? this.setState({difference: false}) : null
      this.setState({num:[...this.state.num,num]},() => {
        if(this.state.num.length >=6) {
            this.props.twoInput ?
              this.seletedNumTwice()
            :
              this.onSubmit(this.state.num)
          }
      })
    }
  }

  deletedNum() {
    const length = this.state.num.length
    length > 0 ?
     this.setState({num: this.state.num.slice(0, length - 1)})
   : null
  }

  renderKeyboard(keyboard, i){
    if(keyboard === ' ') {
      return <View key={i} style={[styles.inputboard,styles.inputNone]} />
    }else {
      return (
        <TouchableOpacity
          style={i == 11 || i == 9 ? [styles.inputboard,styles.inputNone] : styles.inputboard}
          onPress={() => {i == 11  ? this.deletedNum() : this.seletedNum(keyboard)}}
          key={i}
        >
          <Text style={styles.inputText}>{keyboard}</Text>
        </TouchableOpacity>
      )
    }
  }

  renderForget() {
    if(this.props.forget) {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.forget()
              this.close()
            }}
            style={styles.forgetView}
          >
            <Text style={styles.forgetTExt}>忘记密码？</Text>
          </TouchableOpacity>
        )
    }
  }

  renderHead() {
    return (
      <View style={styles.keyboardRemind}>
        <Text style={styles.remindText}>{this.state.twiceInputMessge || this.props.message}</Text>
        <TouchableOpacity
          style={ styles.closeBottom }
          onPress={ () => this.setState({ visible: false, num: []})}
        >
          <Image source={IconClose}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderContent() {
    return (
      <Animated.View style={[styles.modalContent, {height: this.props.height, bottom: this.state.bottom}]} >
        {this.renderHead()}
        <View style={{flex:1,justifyContent:'space-between'}}>
          <View style={styles.keyboardView}>
            <View style={styles.keyboardContent}>
              {this.show.map(i => {
                const l = this.state.num.length
                return (
                  <View key={i} style={[styles.keyboardBox, i == 0 ? {borderLeftWidth:0} : {}]}>
                    { i <= (l-1) ? <View style={styles.circle}/> : null}
                  </View>
                )
              })}
            </View>
            {this.renderForget()}
            {
              this.state.difference ?
                <Text style={styles.difference}>* 两次密码不同，请重新输入!</Text>
              : null
            }
          </View>
          <View style={ styles.keyboard }>
            {this.keyboard.map((keyboard, i) => this.renderKeyboard(keyboard,i))}
          </View>
        </View>
      </Animated.View>
    )
  }

  render() {
    return (
      <Modal
        animationType='none'
        transparent={ true }
        onRequestClose={ () => this.close() }
        visible={ this.state.visible }
      >
        <TouchableOpacity
          style={ styles.modalBox }
          onPress={ () => this.close() }
        />
        {this.renderContent()}
      </Modal>
    )
  }
}

PayModal.propTypes = {
  onSubmit: PropTypes.func,
  forget: PropTypes.func,    //点击忘记密码时候的事件
  message: PropTypes.string,
  upset: PropTypes.bool,
  twoInput: PropTypes.bool,
  height: PropTypes.number,
}

PayModal.defaultProps = {
  height: 380,
  onSubmit: () => {},      // 密码输入完成后的提交事件
  message: '请输入密码',     // 弹出层顶部的提示
  upset: false,            // 键盘是否打乱，默认不打乱
  twoInput: false,         // 是否需要输入两次，默认否
}
