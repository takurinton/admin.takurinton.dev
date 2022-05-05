import { DocumentNode } from "graphql";
import { ActionButton, DataTable, Flex, Typography, useTheme } from "ingred-ui";
import { Link } from "react-router-dom";
import { Paginator } from "./Paginator";

export const Result = ({
  result,
  ast,
}: {
  result: any;
  ast?: DocumentNode;
}) => {
  const theme = useTheme();
  const args = {
    data: result.data.analytics.analytics,
    columns: [
      {
        name: "domain",
        selector: (data: any) => data.domain,
      },
      {
        name: "path",
        selector: (data: any) => data.path,
      },
      {
        name: "created_at",
        selector: (data: any) => data.created_at,
      },
      {
        name: "detail",
        selector: (data: any) => (
          <ActionButton icon="link">
            <Link
              to={`/analytics/detail/?domain=${data.domain}&path=${data.path}`}
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              詳細
            </Link>
          </ActionButton>
        ),
      },
    ],
  };

  return (
    <Flex>
      <Flex>
        <Typography align="right">
          count: {result.data.analytics.count}
        </Typography>
      </Flex>
      <DataTable {...args} />
      <Paginator result={result} />
    </Flex>
  );
};
