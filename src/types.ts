export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  analytics: Analytics;
  analytics_by_path_for_blog: AnalyticsByPathForBlog;
};


export type QueryAnalyticsArgs = {
  domain?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};


export type QueryAnalytics_By_Path_For_BlogArgs = {
  domain: Scalars['Int'];
  path: Scalars['String'];
};

export type AnalyticsType = {
  __typename?: 'AnalyticsType';
  id: Scalars['ID'];
  created_at: Scalars['String'];
  path: Scalars['String'];
  domain: Scalars['String'];
};

export type PathList = {
  __typename?: 'PathList';
  domain: Scalars['String'];
  path: Scalars['String'];
};

export type Analytics = {
  __typename?: 'Analytics';
  count: Scalars['Int'];
  analytics?: Maybe<Array<AnalyticsType>>;
  path_list?: Maybe<Array<PathList>>;
};

export type DateCount = {
  __typename?: 'DateCount';
  date: Scalars['String'];
  count: Scalars['Int'];
};

export type AnalyticsByPathForBlog = {
  __typename?: 'AnalyticsByPathForBlog';
  count: Scalars['Int'];
  analytics?: Maybe<Array<AnalyticsType>>;
  date_count?: Maybe<Array<DateCount>>;
};
