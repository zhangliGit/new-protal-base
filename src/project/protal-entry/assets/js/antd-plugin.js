/**
 * @description 注册全局组件
 */
import {
  Row,
  Col,
  Icon,
  Form,
  Input,
  Button,
  Layout,
  Dropdown,
  Modal,
  Menu,
  LocaleProvider,
  message
} from 'ant-design-vue'
const ComList = [Row, Col, Icon, Form, Input, Button, Layout, Dropdown, Modal, Menu, LocaleProvider, message]
const install = Vue => {
  ComList.forEach(item => {
    Vue.use(item)
  })
  Vue.prototype.$message = message
  Vue.prototype.$Modal = Modal
}
export default {
  install
}
