import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type MongoClass = {
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  createUser: User;
  userLogin: UserResponse;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  ruserData: PhonePasswordInput;
};


export type MutationUserLoginArgs = {
  userData: PhonePasswordInput;
};

export type PhonePasswordInput = {
  phone: Scalars['String'];
  password: Scalars['String'];
};

export type Post = MongoClass & {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  getAlluser: Array<User>;
};

export type User = MongoClass & {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  phone: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserLoginMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, phone: string }> } };

export type CreateUserMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, createdAt: string, phone: string } };


export const UserLoginDocument = gql`
    mutation UserLogin($phone: String!, $password: String!) {
  userLogin(userData: {phone: $phone, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      phone
    }
  }
}
    `;

export function useUserLoginMutation() {
  return Urql.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument);
};
export const CreateUserDocument = gql`
    mutation CreateUser($phone: String!, $password: String!) {
  createUser(ruserData: {phone: $phone, password: $password}) {
    id
    createdAt
    phone
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};