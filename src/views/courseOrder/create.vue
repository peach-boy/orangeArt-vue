<template>
  <page-header-wrapper :title="false" :content="$t('录入学员信息')">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          :label="$t('学员姓名')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'studentName',
              {rules: [{ required: true, message: $t('请输入姓名') }]}
            ]"
            name="name"
            :placeholder="$t('学员姓名')" />
        </a-form-item>
        <a-form-item
          :label="$t('总金额')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'totalAmt',
              {rules: [{ required: true, message: $t('请输入总金额') }]}
            ]"
            name="name"
            :placeholder="$t('总金额')" />
        </a-form-item>
        <a-form-item
          :label="$t('课程总数')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'totalQuantity',
              {rules: [{ required: true, message: $t('请输入课程总数') }]}
            ]"
            name="name"
            :placeholder="$t('课程总数')" />
        </a-form-item>
        <a-form-item
          :label="$t('支付渠道')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
          :help="$t('支付渠道')">
          <a-radio-group v-decorator="['payChannel', { initialValue: 1 }]">
            <a-radio :value="1">{{ $t('现金') }}</a-radio>
            <a-radio :value="2">{{ $t('支付宝') }}</a-radio>
            <a-radio :value="3">{{ $t('微信') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label="$t('备注')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            :placeholder="$t('备注')"
            v-decorator="[
              'description',
              {rules: [{ required: false, message: '请输入备注' }]}
            ]" />
        </a-form-item>
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center" >
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { createCourseOrder } from '@/api/manage'

  export default {
  name: 'create',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          createCourseOrder(values)
            .then(res => {
              console.log('loadData resp:', res)
              if (res.data === true) {
                this.$router.push('/courseOrder/list')
              }
            })
        }
      })
    }
  }
}
</script>
