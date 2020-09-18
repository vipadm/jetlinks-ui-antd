import { message, Modal } from "antd";
import React from "react";
import Service from "../service";
import { createFormActions, FormEffectHooks, SchemaForm } from "@formily/antd";
import { ArrayCards, ArrayTable, Input, DatePicker, Select } from '@formily/antd-components'

interface Props {
    close: Function
}
const actions = createFormActions();

const Save: React.FC<Props> = props => {
    const service = new Service('network/simulator');

    const { onFieldValueChange$ } = FormEffectHooks;
    const changeNetworkTypeEffects = () => {
        const { setFieldState } = actions;

        onFieldValueChange$('networkType').subscribe(({ value }) => {
            setFieldState('*(certId,host,port,clientId,username,password,keepAliveTimeSeconds)', state => {
                state.visible = value === 'mqtt' ? true : false;
            });
        });
    }

    const save = (data: any) => {
        service.save(data).subscribe(() => {
            message.success('保存成功');
            props.close();
        })
    }
    return (
        <Modal
            title="新建模拟器"
            onOk={() => actions.submit()}
            visible
            width={900}
        >
            <SchemaForm
                effects={() => {
                    changeNetworkTypeEffects()
                }}
                actions={actions}
                onSubmit={v => save(v)}
                components={{ DatePicker, Input, ArrayTable, ArrayCards, Select }}
                schema={{
                    "type": "object",
                    "properties": {
                        "NO_NAME_FIELD_$0": {
                            "type": "object",
                            "x-component": "mega-layout",
                            "x-component-props": {
                                "grid": true,
                                "autoRow": true,
                                "columns": 2,
                                "labelCol": 2,
                            },
                            "properties": {
                                "name": {
                                    "title": "名称",
                                    "x-component": "input",
                                    "x-mega-props": {
                                        "span": 2,
                                    }
                                },
                                "networkType": {
                                    "title": "接入方式",
                                    "x-component": "select",
                                    "type": "string",
                                    "enum": [
                                        {
                                            "value": "mqtt",
                                            "label": "MQTT"
                                        },
                                        {
                                            "value": "tcp",
                                            "label": "TCP"
                                        }
                                    ],
                                    "x-mega-props": {
                                        "span": 1,
                                        "labelCol": 4
                                    },
                                },
                                "certId": {
                                    "title": "证书",
                                    "visible": false,
                                    "x-component": "input",
                                    "x-mega-props": {
                                        "span": 1,
                                        "labelCol": 4
                                    },
                                },
                                "host": {
                                    "title": "服务地址",
                                    "visible": false,
                                    "x-component": "input",
                                    "x-mega-props": {
                                        "span": 1,
                                        "labelCol": 4
                                    },
                                },
                                "port": {
                                    "title": "端口",
                                    "x-component": "input",
                                    "visible": false,
                                    "x-mega-props": {
                                        "span": 1,
                                        "labelCol": 4
                                    },
                                },
                                "clientId": {
                                    "title": "ClientId",
                                    "visible": false,
                                    "x-component": "input",
                                    "x-mega-props": {
                                        "span": 2
                                    },
                                },
                                "username": {
                                    "title": "用户名",
                                    "visible": false,
                                    "x-component": "input",
                                    "x-mega-props": {
                                        "span": 2
                                    },
                                },
                                "password": {
                                    "title": "密码",
                                    "visible": false,
                                    "x-component": "input",
                                    "x-mega-props": {
                                        "span": 2
                                    },
                                },
                                "keepAliveTimeSeconds": {
                                    "title": "心跳间隔",
                                    "visible": false,
                                    "x-component": "input",
                                    "x-mega-props": {
                                        "span": 1,
                                        "labelCol": 4
                                    },
                                },
                            }
                        }
                    }
                }} />
        </Modal>
    )

};
export default Save;