<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="学员姓名">
                <a-input v-model="queryParam.studentName" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="课件">
                <a-select placeholder="请选择课件" v-model="queryParam.coursewareId">
                  <a-select-option v-for="d in coursewares" :key="d.id">
                    {{ d.coursewareName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="24">
              <a-form-item label="日期">
                <a-range-picker
                  style="width: 100%"
                  @change="onChange"  />
              </a-form-item>
            </a-col>
            <a-col :md="8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">锁定</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import moment from 'moment'
  import { STable, Ellipsis } from '@/components'
  import { getRoleList, getLessonList, getAllCourseware } from '@/api/manage'

  const columns = [
    {
      title: '学员编号',
      dataIndex: 'id'
    },
    {
      title: '学员姓名',
      dataIndex: 'studentName'
    },
    {
      title: '班级名称',
      dataIndex: 'className'
    },
    {
      title: '课件名称',
      dataIndex: 'coursewareName'
    },
    {
      title: '上课时间',
      dataIndex: 'classTime'
    }
  ]

  const statusMap = {
    1: {
      status: 'begin',
      text: '未开始'
    },
    2: {
      status: 'processing',
      text: '进行中'
    },
    3: {
      status: 'end',
      text: '已结课'
    }
  }

  export default {
    name: 'list',
    components: {
      STable,
      Ellipsis
    },
    data () {
      this.columns = columns
      return {
        // create model
        visible: false,
        confirmLoading: false,
        mdl: null,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return getLessonList(requestParameters)
            .then(res => {
              console.log('loadData resp:', res.data)
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: [],
        coursewares: []
      }
    },
    filters: {
      statusFilter (type) {
        return statusMap[type].text
      },
      statusTypeFilter (type) {
        return statusMap[type].status
      }
    },
    created () {
      getRoleList({ t: new Date() })
      getAllCourseware()
        .then(res => {
          console.log('loadData resp:', res)
          if (res.msg === 'ok') {
            this.coursewares = res.data
            console.log('courewares:', this.coursewares)
          }
        })
    },
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    },
    methods: {
      handleAdd () {
        this.$router.push('/lesson/create')
      },
      handleEdit (record) {
        this.visible = true
        this.mdl = { ...record }
      },
      handleOk () {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields((errors, values) => {
          if (!errors) {
            console.log('values', values)
            if (values.id > 0) {
              // 修改 e.g.
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()

                this.$message.info('修改成功')
              })
            } else {
              // 新增
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()

                this.$message.info('新增成功')
              })
            }
          } else {
            this.confirmLoading = false
          }
        })
      },
      handleCancel () {
        this.visible = false

        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      handleSub (record) {
        if (record.status !== 0) {
          this.$message.info(`${record.no} 订阅成功`)
        } else {
          this.$message.error(`${record.no} 订阅失败，规则已关闭`)
        }
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      resetSearchForm () {
        this.queryParam = {
          date: moment(new Date())
        }
      },
      onChange (date, dateString) {
        this.queryParam.timeStart = dateString[0]
        this.queryParam.timeEnd = dateString[1]
      }
    }
  }
</script>
