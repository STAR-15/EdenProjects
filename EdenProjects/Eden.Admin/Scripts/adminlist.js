//$(function () {
//    $('#dataTable').DataTable();
//})

var app = new Vue({
    el: '#adminlist',
    data() {
        return {
            tableData: {
                loading: true,
                columnsList: [
                    {
                        title: 'Offer ID',
                        width: 70,
                        key: 'offerId'
                    },
                    {
                        title: 'Promo Code',
                        width: 200,
                        render: (h, params) => {
                            return h('div', params.row.offerCodes ? params.row.offerCodes.map(function (item) {
                                return h('div', item.offerCode)
                            }) : "");
                        }
                    },
                    {
                        title: 'Offer Type',
                        width: 120,
                        key: 'offerType'
                    },
                    {
                        title: 'Discount Type',
                        width: 100,
                        render: (h, params) => {
                            return h('div', {}, this.enum_discountType[params.row.discountType]);
                        }
                    },
                    {
                        title: 'Campaign Period',
                        width: 200,
                        render: (h, params) => {
                            return h('div', {}, params.row.startTime + " to " + params.row.endTime);
                        }
                    },
                    {
                        title: 'Quota Type',
                        width: 100,
                        render: (h, params) => {
                            return h('div', {}, this.enum_quotaType[params.row.quotaType]);
                        }
                    },
                    {
                        title: 'Budget / Quota',
                        width: 150,
                        key: 'budgetOrQuota'
                    },
                    {
                        title: 'Total spending',
                        width: 200,
                        key: 'totalSpending'
                    },
                    {
                        title: 'Quota Spent',
                        width: 100,
                        key: 'quotaSpent'
                    },
                    {
                        title: 'Alert Email',
                        width: 200,
                        render: (h, params) => {
                            return h('div', params.row.contactEmails ? params.row.contactEmails.map(function (item) {
                                return h('div', item)
                            }) : "");
                        }
                    },
                    {
                        title: 'Discount %',
                        width: 120,
                        render: (h, params) => {
                            return h('div', params.row.discountType == 1 ? params.row.discountValue + "%" : "");
                        }
                    },
                    {
                        title: 'DiscountAmount',
                        width: 200,
                        render: (h, params) => {
                            return h('div', params.row.discountType == 2 ? params.row.currency + params.row.discountValue : "");
                        }
                    },
                    {
                        title: 'Status',
                        width: 100,
                        render: (h, params) => {
                            return h('div', {}, this.enum_offerGroupName[params.row.offerGroupName]);
                        }
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
            poiColumns: [
                {
                    title: "Poi Id",
                    key: "poiId"
                },
                {
                    title: "Poi Name",
                    key: "poiName"
                },
                {
                    title: "Poi Address",
                    key: "poiAddress"
                },
                {
                    title: "Action",
                    align: "center",
                    fixed: "right",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        margin: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.deletePoi(params.index);
                                        }
                                    }
                                },
                                "Delete"
                            )
                        ]);
                    }
                }
            ],
            detailModel: {
                mode: 'create offer',
                isEnable: true,
                offer: {
                    offerId: '',
                    status: 3,
                    offerType: 14,
                    regionId: 0,
                    titleLang1: '',
                    titleLang2: '',
                    titleLang3: '',
                    //offerPhotoUrl: '',
                    currency: 'HKD',
                    discountType: 1,
                    discountValue: '',
                    offerDistributeChannels: [1, 2, 3, 4, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                    startTime: '',
                    endTime: '',
                    availableStartTime: '',
                    availableEndTime: '',
                    offerCodes: [{
                        offerCode: '',
                        startTime: '',
                        endTime: '',
                        quota: '',
                        status: 5
                    }],
                    ruleData: {
                        minSpendingAmount: '',
                        maxDeductAmount: '',
                        quotaType: 2,
                        quota: '',
                        budgetAmount: "",
                        contactEmails: [],
                    },
                    contentData: {
                        description1: '',
                        description2: '',
                        description3: ''
                    },
                    isAllPoi: 1,
                    sponsorType: 1,
                    offerAction: 3,
                    poiIds: [],
                    accumulativeSpending: '',
                    quotaUsed: '',
                    alertEmail: [{ email: '' }],
                }
            },
            offerDemo: {
                offerId: '',
                status: 3,
                offerType: 14,
                regionId: 0,
                titleLang1: '',
                titleLang2: '',
                titleLang3: '',
                //offerPhotoUrl: '',
                currency: 'HKD',
                discountType: 1,
                discountValue: '',
                offerDistributeChannels: [1, 2, 3, 4, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                startTime: '',
                endTime: '',
                availableStartTime: '',
                availableEndTime: '',
                offerCodes: [{
                    offerCode: '',
                    startTime: '',
                    endTime: '',
                    quota: '',
                    status: 5
                }],
                ruleData: {
                    minSpendingAmount: '',
                    maxDeductAmount: '',
                    quotaType: 2,
                    quota: '',
                    budgetAmount: "",
                    contactEmails: [],
                },
                contentData: {
                    description1: '',
                    description2: '',
                    description3: ''
                },
                isAllPoi: 1,
                sponsorType: 1,
                offerAction: 3,
                poiIds: [],
                accumulativeSpending: '',
                quotaUsed: '',
                alertEmail: [{ email: '' }],
            },
            detailShow: false,
            saveButtonDisable: false,
            filter: {
                offerId: '',
                offerCode: '',
                offerTitle: '',
                offerStatus: [],
                availableStartTimeFrom: '',
                availableStartTimeFromEnd: '',
                availableEndTimeTo: '',
                availableEndTimeToEnd: ''
            },
            regionList: [
                {
                    value: 0,
                    label: '香港'
                }
            ],
            discountTypeList: [
                {
                    value: 1,
                    label: 'Percent'
                },
                {
                    value: 2,
                    label: 'Amount'
                }
            ],
            sponsorTypeList: [
                {
                    value: 1,
                    label: 'Platform'
                },
                {
                    value: 2,
                    label: 'Merchant'
                },
                {
                    value: 3,
                    label: 'Thirdpart'
                }
            ],
            promoCodeStatusList: [
                {
                    value: 5,
                    label: 'Pending'
                },
                {
                    value: 10,
                    label: 'Active'
                },
                {
                    value: 0,
                    label: 'InActive'
                }
            ],
            enum_sponsorType: {
                1: "Platform",
                2: "Merchant",
                3: "Thirdpart"
            },
            paging: {
                next: '',
                previous: '',
                currentPage: 1,
                rows: 10,
                count: 0,
            },
            poiPaging: {
                next: "",
                previous: "",
                currentPage: 1,
                rows: 5,
                count: 0
            },
            isNew: false,
            isDraft: false,
            isEditable: false,
            channelsDisplay: false,
            channelDisplayList: [],
            isChannelCheckAll: true,

        }
    },
    methods: {
        getList: function (page) {
            axios({
                method: 'get',
                url: '/Admin/GetTest'
            }).then(function (resp) {
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
        $('#dataTable').DataTable();
        this.getList(1);
    }
})