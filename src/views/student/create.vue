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
              'name',
              {rules: [{ required: true, message: $t('请输入姓名') }]}
            ]"
            name="name"
            :placeholder="$t('学员姓名')" />
        </a-form-item>
        <a-form-item
          :label="$t('性别')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false">
          <a-radio-group v-decorator="['gender', { initialValue: 1 }]">
            <a-radio :value="1">{{ $t('男') }}</a-radio>
            <a-radio :value="2">{{ $t('女') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label="$t('生日')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }"
          :required="false">
          <a-date-picker
            style="width: 100%"
            v-decorator="[
              'birthYear',
              {rules: [{ required: true, message: '请选择生日'}]}
            ]" />
        </a-form-item>
        <a-form-item
          :label="$t('家庭住址')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'address',
              {rules: [{ required: true, message: $t('请输入家庭住址') }]}
            ]"
            name="name"
             />
        </a-form-item>
        <a-form-item
          :label="$t('手机号')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'mobile',
              {rules: [{ required: true, message: $t('请输入手机号') }]}
            ]"
            name="name"
            :placeholder="$t('手机号')" />
        </a-form-item>

        <a-form-item
          :label="$t('介绍人')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }">
          <a-input
            :placeholder="$t('介绍人')"
            v-decorator="[
              'customer',
              {rules: [{ required: true, message: $t('请输入介绍人') }]}
            ]" />
        </a-form-item>
        <a-form-item
          :label="$t('渠道')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
          :help="$t('学员来源渠道')">
          <a-radio-group v-decorator="['channel', { initialValue: 1 }]">
            <a-radio :value="1">{{ $t('转介绍') }}</a-radio>
            <a-radio :value="2">{{ $t('大众点评') }}</a-radio>
            <a-radio :value="3">{{ $t('其他渠道') }}</a-radio>
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
              'remark',
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
import { createStudent } from '@/api/manage'
import moment from 'moment'

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
          values.birthYear = moment(values.birthYear).format('YYYY-MM-DD')
          console.log('birth', values.birthYear)
          createStudent(values)
            .then(res => {
              console.log('loadData resp:', res)
              if (res.data === true) {
                this.$router.push('/student/list')
              }
            })
        }
      })
    }
  }
}
</script>
