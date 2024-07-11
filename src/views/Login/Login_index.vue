<script setup>
import { ref } from "vue";
// import { loginApi } from '@/apis/userStore.js'
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css'

import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore()
// 表单校验功能
// 表单对象
const form = ref({
  account:'13866666666', // 138xxxxxxxx, x为1~9任一数字皆可
  password:'123456', // 123456
  agree:true
})
// 规则对象
const rules = {
  account: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6~14个字符', trigger: 'blur' }
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        // 自定义校验逻辑
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}

// 获取form实例做统一校验
const formRef = ref(null)
const router = useRouter()
const doLogin = () => {
  const { account, password } = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    console.log(valid)
    // 以valid作为判断条件 如果通过校验才执行登录逻辑
    if (valid){
      // Login
      // const res = await loginApi({ account, password })
      // console.log(res)
      await userStore.getUserInfo({ account,password })

      // 提示用户
      ElMessage({type: 'success', message: '登录成功'})
      // 跳转首页
      router.replace({ path:'/' })
    }
  })
}
</script>

<template>
  <div>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
                     status-icon>
              <el-form-item prop="account" label="账户">
                <el-input v-model="form.account"/>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" type="password"/>
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox v-model="form.agree" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang='scss'>
.login-section {
  //background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width:100vw ;
  margin: 50vw 0;
  background-color: #fff;
  .wrapper {
    width: 90vw;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: $xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 20px 20px 20px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: $priceColor;
          }
          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>