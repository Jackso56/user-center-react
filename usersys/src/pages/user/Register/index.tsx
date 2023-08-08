import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
// @ts-ignore
import {FormattedMessage, history, SelectLang} from 'umi';
import styles from './index.less';
import {AUTHOR} from "@/constant";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword, checkPassword} = values;
    if (userPassword !== checkPassword) {
      message.error("密码不一致");
      return;
    }
    try {
      // 登录
      const id = await register({...values, type});
      // @ts-ignore
      if (id > 0) {
        message.success('注册成功!');
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as { redirect: string };
        history.push("/user/login/?redirect" + redirect); // 遭到登录拦截，登录后跳转到被拦截的页面
        return;
      } else {
        throw new Error("登录失败");
      }

    } catch (error: any) {
      message.error(error.message ?? '注册失败！');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang/>}
      </div>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: "注册"
            }
          }}
          logo={<img alt="logo" src="/logo_.svg"/>}
          title={AUTHOR}
          subTitle={AUTHOR}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab="账号密码注册"
            />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                  {
                    min: 4,
                    type: "string"
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                  {
                    min: 8,
                    type: "string"
                  }
                ]}
              />
            </>
          )}
          <ProFormText.Password
            name="checkPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon}/>,
            }}
            placeholder="确认密码"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="planetCode"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon}/>,
            }}
            placeholder="星球编号"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
              {
                // max: 5,
                type: "string"
              }
            ]}
          />
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
