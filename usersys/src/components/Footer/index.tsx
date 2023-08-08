import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {AUTHOR,AUTHOR_URL} from "@/constant";

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${AUTHOR}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: <><GithubOutlined />Jason</>,
          href: AUTHOR_URL,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
