<template>
  <page-header-wrapper :title="false" :content="$t('录入课时')">
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
          :label="$t('课时类型')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false">
          <a-radio-group v-decorator="['type', { initialValue: 1 }]">
            <a-radio :value="1">{{ $t('正常排课') }}</a-radio>
            <a-radio :value="2">{{ $t('临时加课') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="上课时间"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }"
          :required="false">
          <a-date-picker
            style="width: 100%"
            showTime
            v-decorator="[
              'classTime',
              {rules: [{ required: true, message: '请选择上课时间'}]}
            ]" />
        </a-form-item>
        <a-form-item
          label="班级"
         :labelCol="{lg: {span: 7}, sm: {span: 7}}"
         :wrapperCol="{lg: {span: 8}, sm: {span: 17} }"
         :required="false">
          <template>
            <a-cascader
              :field-names="{ label: 'name', value: 'code', children: 'items' }"
              :options="options"
              placeholder="请选择班级"
              @change="onChange"
            />
          </template>
        </a-form-item>
        <a-form-item
          label="课件"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }"
          :required="false">
          <a-select placeholder="请选择课件" v-decorator="[ 'coursewareId', {rules: [{ required: true, message: '请选择课件'}]} ]">
            <a-select-option value="1">月饼</a-select-option>
            <a-select-option value="2">西瓜</a-select-option>
            <a-select-option value="3">葡萄</a-select-option>
          </a-select>
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
import { createLesson, getAllClass } from '@/api/manage'
import moment from 'moment'

  export default {
  name: 'create',
  data () {
    return {
      options: [],
      selectedClassId: 0,
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.getAll()
  },
    methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          values.classTime = moment(values.classTime).format('yyyy-MM-DD hh:mm:ss')
          values.classId = this.selectedClassId
          console.log('classTime', values.classTime)
          createLesson(values)
            .then(res => {
              console.log('s resp:', res)
              if (res.data === true) {
                this.$router.push('/lesson/list')
              }
            })
        }
      })
    },
    getAll () {
      getAllClass()
        .then(res => {
          console.log('loadData resp:', res)
          if (res.msg === 'ok') {
            this.options = res.data
            console.log('options:', this.options)
          }
        })
    },
    onChange (value) {
      this.selectedClassId = value[2]
      console.log('onChange', this.selectedClassId)
    }
  }
}
</script>
