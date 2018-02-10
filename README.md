# keyboard
纯数字安全键盘
<img src="https://raw.githubusercontent.com/ws199501/keyboard/master/%E6%8F%90%E7%8E%B0.jpeg" alt="截图" />
* defaultProps:
  * height: 380,             // 键盘高度
  * onSubmit: () => {},      // 密码输入完成后的提交事件
  * message: '请输入密码',     // 弹出层顶部的提示
  * upset: false,            // 键盘是否打乱，默认不打乱
  * twoInput: false,         // 是否需要输入两次，默认否
  
* propTypes：
  * onSubmit: PropTypes.func,
  * forget: PropTypes.func,    //点击忘记密码时候的事件，有则出现“忘记密码”，反则无
  * message: PropTypes.string,
  * upset: PropTypes.bool,
  * twoInput: PropTypes.bool,
  * height: PropTypes.number,
