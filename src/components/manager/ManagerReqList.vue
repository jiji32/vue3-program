<script setup>
import Mock from '../../mock/Mock'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const queryParams = ref({
    state:"",
    info:""
})
const managerList = ref([])
 
onMounted(() => {
    managerList.value = Mock.getManagerReqList();
})

function search() {
    ElMessage({
        type:'success',
        message:'请求参数：' + JSON.stringify(queryParams.value)
    });
    managerList.value = Mock.getManagerReqList();
}
function clear() {
    queryParams.value = {
        state:"",
        info:""
    };
    managerList.value = Mock.getManagerReqList();
}
function click(item) {
    item.state = !item.state;
}  
</script>
<template>
    <div class="content-container" direction="vertical">
        <div>
            <el-container class="content-row">
                <div class="input-tip">
                    用户状态:
                </div>
                <div class="input-field">
                    <el-input v-model="queryParams.state"></el-input>
                </div>
                <div class="input-tip">
                    用户信息:
                </div>
                <div class="input-field">
                    <el-input v-model="queryParams.info"></el-input>
                </div>
            </el-container>
            <el-container class="content-row">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clear">清空搜索条件</el-button>
            </el-container>
        </div>
        <div>
            <el-table
            :data="managerList"
            tooltip-effect="dark"
            style="width: 100%">
                <el-table-column
                label="用户信息"
                width="300"
                prop="people">
                </el-table-column>
                <el-table-column
                label="状态"
                width="100">
                    <template #default="scope">
                          <el-tag :type="scope.row.state ? 'success' : 'warning'">{{scope.row.state ? '通过' : '待审核'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                label="更新时间"
                width="200"
                prop="time">
                </el-table-column>
                <el-table-column
                label="添加时间"
                width="200"
                prop="reqTime">
                </el-table-column>  
                <el-table-column
                label="操作"
                width="100"
                prop="reqTime">
                    <template #default='scope'>
                        <el-button size="small" @click='click(scope.row)' :type="scope.row.state ? 'danger' : 'success'">{{scope.row.state ? '下线' : '通过'}}</el-button>
                    </template>
                </el-table-column>              
            </el-table>
        </div>
    </div>
</template>