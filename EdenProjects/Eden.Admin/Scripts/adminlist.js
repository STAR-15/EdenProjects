﻿var app = new Vue({
    el: '#adminlist',
    data: function() {
        return{
            tableData: {
                loading: true,
                columnsList: [
                    {
                        title: 'UserId',
                        width: 70,
                        key: 'UserId'
                    },
                    {
                        title: 'UserName',
                        width: 70,
                        key: 'UserName'
                    },
                    {
                        title: 'CreateTime',
                        width: 70,
                        key: 'CreateTime'
                    },
                    {
                        title: 'UpdateTime',
                        width: 70,
                        key: 'UpdateTime'
                    },
                    {
                        title: 'Phone',
                        width: 70,
                        key: 'Phone'
                    },
                    {
                        title: 'Email',
                        width: 70,
                        key: 'Email'
                    },
                    {
                        title: 'Description',
                        width: 200,
                        key: 'Description'
                    },
                    {
                        title: 'Role',
                        width: 100,
                        key: 'Role'
                    },
                    {
                        title: 'Action',
                        width: 160,
                        align: 'center',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px',

                                    },
                                    on: {
                                        click: () => {
                                            this.openDetail(params.row.offerId)
                                        }
                                    }
                                }, 'Detail')]);
                        }
                    }
                ],
                data: [],
                count: 0,
            },
            detailModel: {
                mode: 'create admin',
                isEnable: true,
                user: {
                    UserId: '',
                    UserName: '',
                    Password: '',
                    Phone: '',
                    Email: '',
                    Description: '',
                    Role: '',
                }
            },
            enum_role: {
                1: "SuperAdmin",
                2: "Admin",
                3: "Staff"
            },
            roleType: [
                {
                    value: 1,
                    label: 'SuperAdmin'
                },
                {
                    value: 2,
                    label: 'Admin'
                },
                {
                    value: 3,
                    label: 'Staff'
                }
            ],
            keyword: '',
            paging: {
                next: '',
                previous: '',
                currentPage: 1,
                rows: 10,
                count: 0,
            },
            isNew: false,
        }
    },
    methods: {
        getList: function (page) {
            const that = this;
            axios({
                method: 'get',
                url: '/Admin/GetList' + '?key=' + that.keyword
            }).then(function (resp) {
                console.log(resp.data);
                that.tableData.data = resp.data;
                MW.MsgUtil.msg('成功');
            }).catch(err => {
                console.log('请求失败:' + err.status + ',' + err.statusText);
            });
        },
        openDetail: function (id) {
            const that = this;
            if (id == 0) {
                that.detailModel.mode = 'create admin',
                that.detailModel.user = {
                    UserId: '',
                    UserName: '',
                    Password: '',
                    Phone: '',
                    Email: '',
                    Description: '',
                    Role: 1,
                }
            } else {
                that.detailModel.mode = 'edit admin',
                that.detailModel.user = id;
            }
            $("#adminDetail").modal("show");
        },
        saveUser: function () {
            const that = this;
            var param = that.detailModel.user;
            axios.post('/Admin/AddUser', param).then(function (resp) {
                console.log(resp.data);
            }).catch(err => {
                console.log('请求失败:' + err.status + ',' + err.statusText);
            });
        }
    },
    computed: {
        formTitle() {
            return this.detailModel.mode;
        },
        exportDisable() {
            return this.paging.count > 0;
        }
    },
    mounted: function () {
        console.log("strat");
        this.getList(1);
    }
})