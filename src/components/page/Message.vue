<template>
    <div class="public-warp">
        <el-tabs>
            <el-tab-pane :label="`未读消息（${unread.length}）`">
                <el-table :data="unread" :show-header="false">
                    <el-table-column prop='title'></el-table-column>
                    <el-table-column prop="date" width="180"></el-table-column>
                    <el-table-column width="120">
                        <template v-slot="unread">
                            <el-button size="small" @click="readUnread(unread.$index)">标为已读</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button class="msg-footer-btn" type="primary" @click="readAll">全部标为已读</el-button>
            </el-tab-pane>

            <el-tab-pane :label="`已读消息（${read.length}）`">
                <el-table :data="read" :show-header="false">
                    <el-table-column prop='title'></el-table-column>
                    <el-table-column prop="date" width="180"></el-table-column>
                    <el-table-column width="100">
                        <template v-slot="read">
                            <el-button size="small" @click="del(read.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button class="msg-footer-btn" type="primary" @click="delAll">删除全部</el-button>
            </el-tab-pane>

            <el-tab-pane :label="`回收站（${recycle.length}）`">
                <el-table :data="recycle" :show-header="false">
                    <el-table-column prop='title'></el-table-column>
                    <el-table-column prop="date" width="180"></el-table-column>
                    <el-table-column width="100">
                        <template v-slot="recycle">
                            <el-button size="small" @click="restore(recycle.$index)">还原</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button class="msg-footer-btn" type="primary" @click="empty">清空回收站</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'Message',

        data() {
            return {
                unread: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                }, {
                    date: '2018-04-19 21:00:00',
                    title: '今晚12点整发大红包，先到先得',
                }],
                read: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }],
                recycle: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }]
            }
        },

        methods: {
            readUnread(index) {
                this.read.push(this.unread[index]);
                this.unread.splice(index, 1);
            },

            readAll() {
                while (this.unread.length > 0) {
                    this.readUnread(0);
                }
            },

            del(index) {
                this.recycle.push(this.read[index]);
                this.read.splice(index, 1);
            },

            delAll() {
                while (this.read.length > 0) {
                    this.del(0);
                }
            },

            restore(index) {
                this.read.push(this.recycle[index]);
                this.recycle.splice(index, 1);
            },

            empty() {
                let len = this.recycle.length;
                this.recycle.splice(0, len);
            }
        },
    };
</script>


<style>
    .msg-footer-btn{
        margin: 30px 0 0 0;
    }
    </style>