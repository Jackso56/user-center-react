import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {useRef} from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";


export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    title: 'ID',
    copyable: true
  },
  {
    dataIndex: 'planetCode',
    title: '星球编号',
    copyable: true
  },
  {
    dataIndex: 'username',
    title: '昵称',
    copyable: true
  },
  {
    dataIndex: 'userAccount',
    title: '账号',
  },
  {
    dataIndex: 'avatarUrl',
    title: '头像',
    copyable: true,
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100}></Image>
      </div>
    ),
  },
  {
    dataIndex: 'gender',
    title: '性别',
    copyable: true,
    valueEnum: {
      0: {text: "女"},
      1: {text: "男"},
    }
  },
  {
    dataIndex: 'phone',
    title: '电话',
    copyable: true
  },
  {
    dataIndex: 'email',
    title: '邮箱',
    copyable: true
  },
  {
    dataIndex: 'userStatus',
    title: '状态',
    copyable: true
  },
  {
    dataIndex: 'createTime',
    title: '创建时间',
    copyable: true,
    valueType: "dateTime"
  },
  {
    dataIndex: 'UpdateTime',
    title: '更新时间',
    copyable: true,
    valueType: "dateTime"
  },
  {
    dataIndex: 'isDelete',
    title: '是否删除',
    copyable: true
  },
  {
    dataIndex: 'userRole',
    title: '角色',
    copyable: true,
    valueType: "select",
    valueEnum: {
      0: {text: "普通用户", status: "default"},
      1: {text: "管理员", status: "success"},
    }
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  // @ts-ignore
  return (
    // @ts-ignore
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        await waitTime(2000);
        const userList = await searchUsers()
        return {
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          // @ts-ignore
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
