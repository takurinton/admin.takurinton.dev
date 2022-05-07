import { Fragment, ReactNode } from "react";
import { Typography } from "ingred-ui";
import { Route } from "react-router-dom";
import { Analytics } from "../../../pages/Analytics/Analytics";
import { AnalyticsDetail } from "../../../pages/AnalyticsDetail/AnalyticsDetail";
import { Blog } from "../../../pages/Blog/Blog";
import { BlogEdit } from "../../../pages/BlogEdit/BlogEdit";
import { BlogCreate } from "../../../pages/BlogCreate/BlogCreate";

const routes = [
  {
    text: "takurinton管理画面",
    component: () => <></>,
    path: "/",
  },
  {
    text: "ブログ管理画面",
    component: <Blog />,
    path: "/blog",
  },
  {
    text: "記事の編集",
    component: <BlogEdit />,
    path: "/blog/edit/:id",
  },
  {
    text: "記事の作成",
    component: <BlogCreate />,
    path: "/blog/create",
  },
  {
    text: "ポートフォリオ管理画面",
    component: () => <></>,
    path: "/portfolio",
  },
  {
    text: "analytics 管理画面",
    component: <Analytics />,
    path: "/analytics",
  },
  {
    text: "analytics 詳細画面",
    component: <AnalyticsDetail />,
    path: "/analytics/detail",
  },
  {
    text: "ユーザー設定画面",
    component: () => <></>,
    path: "/settings/user",
  },
];

const PageWithHeader = ({
  text,
  children,
}: {
  text: string;
  children?: ReactNode;
}) => (
  <>
    <Typography component="h1" size="xxxxl">
      {text}
    </Typography>
    {children}
  </>
);

export const AppRoute = () => (
  <div style={{ padding: "20px 0 0 20px" }}>
    {routes.map(({ path, text, component }) => (
      <Fragment key={`${path}-${text}`}>
        <Route exact path={path}>
          <PageWithHeader text={text}>{component}</PageWithHeader>
        </Route>
      </Fragment>
    ))}
  </div>
);
