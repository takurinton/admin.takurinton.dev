import { Fragment, ReactNode } from "react";
import { Typography } from "ingred-ui";
import { Route } from "react-router-dom";
import { AnalyticsForm } from "../../../pages/AnalyticsForm";
import { DetailForm } from "../../../pages/Detail";

const routes = [
  {
    text: "takurinton管理画面",
    component: () => <></>,
    path: "/",
  },
  {
    text: "ブログ管理画面",
    component: () => <></>,
    path: "/blog",
  },
  {
    text: "ポートフォリオ管理画面",
    component: () => <></>,
    path: "/portfolio",
  },
  {
    text: "analytics 管理画面",
    component: <AnalyticsForm />,
    path: "/analytics",
  },
  {
    text: "analytics 詳細画面",
    component: <DetailForm />,
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
