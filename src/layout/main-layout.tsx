import { useState } from "react";
import {
  Outlet,
  useLocation,
  Link,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button } from "@arco-design/web-react";
import {
  IconHome,
  IconCalendar,
  IconCaretRight,
  IconCaretLeft,
  IconDashboard,
  IconUser,
} from "@arco-design/web-react/icon";

const { Header, Content, Sider, Footer } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface MenuItemConfig {
  key: string;
  path?: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItemConfig[];
}

const menuItems: MenuItemConfig[] = [
  {
    key: "home",
    path: "/",
    label: "首页",
    icon: <IconHome />,
  },
  {
    key: "about",
    path: "/about",
    label: "关于",
    icon: <IconCalendar />,
  },
  {
    key: "contact",
    path: "/contact",
    label: "联系",
    icon: <IconCalendar />,
  },
  {
    key: "nav1",
    label: "导航 1",
    icon: <IconCalendar />,
    children: [
      { key: "nav1_1", label: "菜单 1" },
      { key: "nav1_2", label: "菜单 2" },
      {
        key: "nav2",
        label: "导航 2",
        children: [
          { key: "nav2_1", label: "菜单 1" },
          { key: "nav2_2", label: "菜单 2" },
        ],
      },
      {
        key: "nav3",
        label: "导航 3",
        children: [
          { key: "nav3_1", label: "菜单 1" },
          { key: "nav3_2", label: "菜单 2" },
          { key: "nav3_3", label: "菜单 3" },
        ],
      },
    ],
  },
  {
    key: "nav4",
    label: "导航 4",
    icon: <IconCalendar />,
    children: [
      { key: "nav4_1", label: "菜单 1" },
      { key: "nav4_2", label: "菜单 2" },
      { key: "nav4_3", label: "菜单 3" },
    ],
  },
];

const findKeyByPath = (
  items: MenuItemConfig[],
  path: string
): string | null => {
  for (const item of items) {
    if (item.path === path) {
      return item.key;
    }
    if (item.children) {
      const found = findKeyByPath(item.children, path);
      if (found) return found;
    }
  }
  return null;
};

const findPathByKey = (items: MenuItemConfig[], key: string): string | null => {
  for (const item of items) {
    if (item.key === key) {
      return item.path || null;
    }
    if (item.children) {
      const found = findPathByKey(item.children, key);
      if (found) return found;
    }
  }
  return null;
};

const getBreadcrumbs = (
  matches: unknown[]
): { path: string; title: string }[] => {
  const matchWithHandle = matches.find(
    (match) =>
      typeof match === "object" &&
      match !== null &&
      "handle" in match &&
      typeof (match as { handle: unknown }).handle === "object" &&
      (match as { handle: { title?: unknown } }).handle?.title !== undefined
  );

  if (matchWithHandle && typeof matchWithHandle === "object") {
    const title = (matchWithHandle as { handle: { title: string } }).handle
      .title;
    if (title) {
      return [{ path: "/", title }];
    }
  }

  return [{ path: "/", title: "首页" }];
};

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const getSelectedKeys = (): string[] => {
    const path = location.pathname;
    const matchedKey = findKeyByPath(menuItems, path);
    return matchedKey ? [matchedKey] : ["home"];
  };

  const handleMenuClick = (key: string) => {
    const path = findPathByKey(menuItems, key);
    if (path) {
      navigate(path);
    }
  };

  const breadcrumbs = getBreadcrumbs(matches);

  const renderMenuItems = (items: MenuItemConfig[]): React.ReactNode => {
    return items.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                {item.icon}
                {item.label}
              </span>
            }
          >
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem key={item.key}>
          <span>
            {item.icon}
            {item.label}
          </span>
        </MenuItem>
      );
    });
  };

  return (
    <Layout className="layout-collapse-demo min-h-screen">
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        breakpoint="xl"
        className="pt-6 flex flex-col h-screen"
      >
        <div className={`logo flex items-center mb-4 overflow-hidden ${collapsed ? 'justify-center' : 'px-3'}`}>
          <IconDashboard className={`text-2xl text-blue-500 shrink-0 ${collapsed ? '' : 'mr-2'}`} />
          {!collapsed && <span className="text-lg font-semibold whitespace-nowrap">Arco Project</span>}
        </div>
        <Menu
          defaultOpenKeys={["nav1"]}
          selectedKeys={getSelectedKeys()}
          onClickMenuItem={handleMenuClick}
          className="w-full"
        >
          {renderMenuItems(menuItems)}
        </Menu>
        <div className={`mt-auto flex items-center ${collapsed ? 'justify-center' : 'px-3 py-4'}`}>
          <div className={`flex items-center ${collapsed ? '' : 'w-full'}`}>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
              <IconUser className="text-white text-sm" />
            </div>
            {!collapsed && (
              <div className="ml-3 overflow-hidden">
                <div className="text-sm font-medium whitespace-nowrap">用户名</div>
                <div className="text-xs text-gray-500 whitespace-nowrap">user@example.com</div>
              </div>
            )}
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between">
          <Button className="trigger" onClick={handleCollapsed}>
            {collapsed ? <IconCaretRight /> : <IconCaretLeft />}
          </Button>
        </Header>
        <Layout className="px-6">
          <Breadcrumb className="mx-4 my-4">
            {breadcrumbs.map((item, index) => (
              <Breadcrumb.Item key={item.path}>
                {index === breadcrumbs.length - 1 ? (
                  <span>{item.title}</span>
                ) : (
                  <Link to={item.path}>{item.title}</Link>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content className="p-6 bg-gray-100 ">
            <Outlet />
          </Content>
          <Footer className="text-center">
            Arco Project Demo ©2024 Created by Arco Design
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
