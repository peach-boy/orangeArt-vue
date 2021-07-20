<template>
  <page-header-wrapper :title="false" :content="$t('新增班级啊')">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="星期"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 4}, sm: {span: 17} }"
          :required="false">
          <a-select placeholder="请选择星期" v-decorator="[ 'weekDay', {rules: [{ required: true, message: '请选择星期'}]} ]">
            <a-select-option value="1">周一</a-select-option>
            <a-select-option value="2">周二</a-select-option>
            <a-select-option value="3">周三</a-select-option>
            <a-select-option value="4">周四</a-select-option>
            <a-select-option value="5">周五</a-select-option>
            <a-select-option value="6">周六</a-select-option>
            <a-select-option value="7">周日</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('开始时间')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }"
          :required="false">
          <a-time-picker format="HH:mm" :default-open-value="moment('00:00', 'HH:mm')" @change="getBeginTime"/>
        </a-form-item>
        <a-form-item
          :label="$t('结束时间')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 17} }"
          :required="false">
          <a-time-picker format="HH:mm" :default-open-value="moment('00:00', 'HH:mm')" @change="getEndTime"/>
        </a-form-item>
        <a-form-item
          :label="$t('科目')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false">
          <a-radio-group v-decorator="['subjectId', { initialValue: 1 }]">
            <a-radio v-for="d in subjects" :key="d.id" :value="d.id">
              {{ d.subjectName }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label="$t('班级类型')"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false">
          <a-radio-group v-decorator="['type', { initialValue: 1 }]">
            <a-radio :value="1">{{ $t('平日班级') }}</a-radio>
            <a-radio :value="2">{{ $t('暑假班级') }}</a-radio>
            <a-radio :value="3">{{ $t('寒假班级') }}</a-radio>
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
import { createClass, getAllSubject } from '@/api/manage'
import moment from 'moment'

  export default {
  name: 'create',
  data () {
    return {
      moment,
      form: this.$form.createForm(this),
      beginTime: '',
      endTime: '',
      subjects: []
    }
  },
  created () {
    getAllSubject()
      .then(res => {
        console.log('loadData resp:', res)
        if (res.msg === 'ok') {
          this.subjects = res.data
          console.log('courewares:', this.subjects)
        }
      })
  },
    methods: {
    getBeginTime (time, timeString) {
      this.beginTime = timeString
    },
    getEndTime (time, timeString) {
      this.endTime = timeString
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.beginTime = this.beginTime
          values.endTime = this.endTime
          console.log('Received values of form: ', values)
          createClass(values)
            .then(res => {
              console.log('loadData resp:', res)
              if (res.data === true) {
                this.$router.push('/class/list')
              }
            })
        }
      })
    }
  }
}
</script>
