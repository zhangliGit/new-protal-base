<template>
  <div class="panel">
    <div class="panel-left">
      <search-form :is-reset="isReset" @search-form="searchForm" :search-label="searchLabel"> </search-form>
      <table-list
        isCheck
        isZoom
        v-model="chooseList"
        :page-list="pageList"
        @selectAll="selectAll"
        :columns="columns"
        :table-list="tableList"
      >
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
    <div class="panel-right">
      <div class="content">
        <div class="right-head right-item">
          <div class="title">已选择</div>
          <div class="text">2个</div>
        </div>
        <div class="right-item">
          <div class="title">选项1</div>
          <div class="text">
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </div>
        </div>
        <div class="right-item">
          <div class="title">选项2</div>
          <div class="text">
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
export default {
  props: {
    isReset: {
      type: Boolean,
      default: false
    },
    searchLabel: {
      type: Array,
      default: () => []
    },
    searchForm: {
      type: Function,
      default: null
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    isZoom: {
      type: Boolean,
      default: false
    },
    chooseList: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableList: {
      type: Array,
      default: () => []
    },
    pageList: {
      type: Array,
      default: () => []
    },
    selectAll: {
      type: Function,
      default: null
    },
    total: {
      type: Number,
      default: 0
    },
    showList: {
      type: Function,
      default: null
    }
  },
  components: {
    SearchForm,
    TableList,
    PageNum
  }
}
</script>

<style lang="less" scoped>
.panel {
  display: flex;
  width: 100%;
  height: 100%;

  .panel-left {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding-right: 40px;
  }
  .panel-right {
    width: 20%;
    overflow-y: auto;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
    padding: 0 40px;

    .content {
      border: 1px solid #ccc;
    }

    .right-item {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;

      .title {
        flex: 1;
        padding-left: 20px;
      }
      .text {
        width: 30%;
      }
    }

    .right-item:last-child {
      border: 0;
    }

    .right-head {
      background-color: rgb(232, 232, 232);
    }
  }
}
</style>
