import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as echarts from 'echarts';
import {UserInfo} from './login/loginEntity';

@Injectable()
export class GlobalConfig {
    public static ApiURL = 'http://172.72.100.190:8580';
    public static USERINFO: UserInfo;

    public static echartsTheme =
        {
            'color': [
                '#27cffe',
                '#53e59e',
                '#ffc954',
                '#ff7575',
                '#a992fc',
                '#16c6eb',
                '#2dded4',
                '#fb7c5b',
                '#f8e177'
            ],
            'backgroundColor': '#062f43',
            'textStyle': {},
            'title': {
                'textStyle': {
                    'color': '#e1e1e1'
                },
                'subtextStyle': {
                    'color': '#e1e1e1'
                }
            },
            'line': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 1
                    }
                },
                'lineStyle': {
                    'normal': {
                        'width': 2
                    }
                },
                'symbolSize': 4,
                'symbol': 'emptyCircle',
                'smooth': false
            },
            'radar': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 1
                    }
                },
                'lineStyle': {
                    'normal': {
                        'width': 2
                    }
                },
                'symbolSize': 4,
                'symbol': 'emptyCircle',
                'smooth': false
            },
            'bar': {
                'itemStyle': {
                    'normal': {
                        'barBorderWidth': 0,
                        'barBorderColor': '#222255'
                    },
                    'emphasis': {
                        'barBorderWidth': 0,
                        'barBorderColor': '#222255'
                    }
                }
            },
            'pie': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    },
                    'emphasis': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    }
                }
            },
            'scatter': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    },
                    'emphasis': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    }
                }
            },
            'boxplot': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    },
                    'emphasis': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    }
                }
            },
            'parallel': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    },
                    'emphasis': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    }
                }
            },
            'sankey': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    },
                    'emphasis': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    }
                }
            },
            'funnel': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    },
                    'emphasis': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    }
                }
            },
            'gauge': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    },
                    'emphasis': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    }
                }
            },
            'candlestick': {
                'itemStyle': {
                    'normal': {
                        'color': '#c23531',
                        'color0': '#314656',
                        'borderColor': '#c23531',
                        'borderColor0': '#314656',
                        'borderWidth': 1
                    }
                }
            },
            'graph': {
                'itemStyle': {
                    'normal': {
                        'borderWidth': 0,
                        'borderColor': '#222255'
                    }
                },
                'lineStyle': {
                    'normal': {
                        'width': 1,
                        'color': '#aaa'
                    }
                },
                'symbolSize': 4,
                'symbol': 'emptyCircle',
                'smooth': false,
                'color': [
                    '#27cffe',
                    '#53e59e',
                    '#ffc954',
                    '#ff7575',
                    '#a992fc',
                    '#16c6eb',
                    '#2dded4',
                    '#fb7c5b',
                    '#f8e177'
                ],
                'label': {
                    'normal': {
                        'textStyle': {
                            'color': '#e1e1e1'
                        }
                    }
                }
            },
            'map': {
                'itemStyle': {
                    'normal': {
                        'areaColor': '#eee',
                        'borderColor': '#444',
                        'borderWidth': 0.5
                    },
                    'emphasis': {
                        'areaColor': 'rgba(255,215,0,0.8)',
                        'borderColor': '#444',
                        'borderWidth': 1
                    }
                },
                'label': {
                    'normal': {
                        'textStyle': {
                            'color': '#000'
                        }
                    },
                    'emphasis': {
                        'textStyle': {
                            'color': 'rgb(100,0,0)'
                        }
                    }
                }
            },
            'geo': {
                'itemStyle': {
                    'normal': {
                        'areaColor': '#eee',
                        'borderColor': '#444',
                        'borderWidth': 0.5
                    },
                    'emphasis': {
                        'areaColor': 'rgba(255,215,0,0.8)',
                        'borderColor': '#444',
                        'borderWidth': 1
                    }
                },
                'label': {
                    'normal': {
                        'textStyle': {
                            'color': '#000'
                        }
                    },
                    'emphasis': {
                        'textStyle': {
                            'color': 'rgb(100,0,0)'
                        }
                    }
                }
            },
            'categoryAxis': {
                'axisLine': {
                    'show': true,
                    'lineStyle': {
                        'color': '#256888'
                    }
                },
                'axisTick': {
                    'show': true,
                    'lineStyle': {
                        'color': '#256888'
                    }
                },
                'axisLabel': {
                    'show': true,
                    'textStyle': {
                        'color': '#e1e1e1'
                    }
                },
                'splitLine': {
                    'show': true,
                    'lineStyle': {
                        'color': [
                            '#09435f'
                        ]
                    }
                },
                'splitArea': {
                    'show': false,
                    'areaStyle': {
                        'color': [
                            'rgba(250,250,250,0.3)',
                            'rgba(200,200,200,0.3)'
                        ]
                    }
                }
            },
            'valueAxis': {
                'axisLine': {
                    'show': true,
                    'lineStyle': {
                        'color': '#256888'
                    }
                },
                'axisTick': {
                    'show': true,
                    'lineStyle': {
                        'color': '#256888'
                    }
                },
                'axisLabel': {
                    'show': true,
                    'textStyle': {
                        'color': '#e1e1e1'
                    }
                },
                'splitLine': {
                    'show': true,
                    'lineStyle': {
                        'color': [
                            '#09435f'
                        ]
                    }
                },
                'splitArea': {
                    'show': false,
                    'areaStyle': {
                        'color': [
                            'rgba(250,250,250,0.3)',
                            'rgba(200,200,200,0.3)'
                        ]
                    }
                }
            },
            'logAxis': {
                'axisLine': {
                    'show': true,
                    'lineStyle': {
                        'color': '#256888'
                    }
                },
                'axisTick': {
                    'show': true,
                    'lineStyle': {
                        'color': '#256888'
                    }
                },
                'axisLabel': {
                    'show': true,
                    'textStyle': {
                        'color': '#e1e1e1'
                    }
                },
                'splitLine': {
                    'show': true,
                    'lineStyle': {
                        'color': [
                            '#09435f'
                        ]
                    }
                },
                'splitArea': {
                    'show': false,
                    'areaStyle': {
                        'color': [
                            'rgba(250,250,250,0.3)',
                            'rgba(200,200,200,0.3)'
                        ]
                    }
                }
            },
            'timeAxis': {
                'axisLine': {
                    'show': true,
                    'lineStyle': {
                        'color': '#256888'
                    }
                },
                'axisTick': {
                    'show': true,
                    'lineStyle': {
                        'color': '#256888'
                    }
                },
                'axisLabel': {
                    'show': true,
                    'textStyle': {
                        'color': '#e1e1e1'
                    }
                },
                'splitLine': {
                    'show': true,
                    'lineStyle': {
                        'color': [
                            '#09435f'
                        ]
                    }
                },
                'splitArea': {
                    'show': false,
                    'areaStyle': {
                        'color': [
                            'rgba(250,250,250,0.3)',
                            'rgba(200,200,200,0.3)'
                        ]
                    }
                }
            },
            'toolbox': {
                'iconStyle': {
                    'normal': {
                        'borderColor': '#e1e1e1'
                    },
                    'emphasis': {
                        'borderColor': '#ffffff'
                    }
                }
            },
            'legend': {
                'textStyle': {
                    'color': '#e1e1e1'
                }
            },
            'tooltip': {
                'axisPointer': {
                    'lineStyle': {
                        'color': '#ccc',
                        'width': 1
                    },
                    'crossStyle': {
                        'color': '#ccc',
                        'width': 1
                    }
                }
            },
            'timeline': {
                'lineStyle': {
                    'color': '#293c55',
                    'width': 1
                },
                'itemStyle': {
                    'normal': {
                        'color': '#293c55',
                        'borderWidth': 1
                    },
                    'emphasis': {
                        'color': '#a9334c'
                    }
                },
                'controlStyle': {
                    'normal': {
                        'color': '#293c55',
                        'borderColor': '#293c55',
                        'borderWidth': 0.5
                    },
                    'emphasis': {
                        'color': '#293c55',
                        'borderColor': '#293c55',
                        'borderWidth': 0.5
                    }
                },
                'checkpointStyle': {
                    'color': '#e43c59',
                    'borderColor': 'rgba(194,53,49, 0.5)'
                },
                'label': {
                    'normal': {
                        'textStyle': {
                            'color': '#293c55'
                        }
                    },
                    'emphasis': {
                        'textStyle': {
                            'color': '#293c55'
                        }
                    }
                }
            },
            'visualMap': {
                'color': [
                    '#ffffff',
                    '#d88273',
                    '#f6efa6'
                ]
            },
            'dataZoom': {
                'backgroundColor': 'rgba(47,69,84,0)',
                'dataBackgroundColor': 'rgba(47,69,84,0.3)',
                'fillerColor': 'rgba(167,183,204,0.4)',
                'handleColor': '#a7b7cc',
                'handleSize': '100%',
                'textStyle': {
                    'color': '#333'
                }
            },
            'markPoint': {
                'label': {
                    'normal': {
                        'textStyle': {
                            'color': '#e1e1e1'
                        }
                    },
                    'emphasis': {
                        'textStyle': {
                            'color': '#e1e1e1'
                        }
                    }
                }
            }
        };
    public static echarts = echarts as any;

    public static handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    constructor(public http: HttpClient) {
    }
}
