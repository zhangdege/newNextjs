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
  sendToken: UserResponse;
  createUser: User;
  userLogin: UserResponse;
  userPhoneLoginOrregist: UserResponse;
  logout: Scalars['Boolean'];
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


export type MutationSendTokenArgs = {
  phone: Scalars['String'];
};


export type MutationCreateUserArgs = {
  ruserData: PhonePasswordInput;
};


export type MutationUserLoginArgs = {
  userData: PhonePasswordInput;
};


export type MutationUserPhoneLoginOrregistArgs = {
  password?: Maybe<Scalars['String']>;
  tokenData: PhoneTokenInput;
};

export type PhonePasswordInput = {
  phone: Scalars['String'];
  password: Scalars['String'];
};

export type PhoneTokenInput = {
  phone: Scalars['String'];
  token: Scalars['String'];
};

export type Post = MongoClass & {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  creator: User;
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  getAlluser: Array<User>;
  me?: Maybe<User>;
};

export type User = MongoClass & {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['String'];
  balance: Scalars['Float'];
  posts: Array<Post>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreatePostsMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreatePostsMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, creator: { __typename?: 'User', id: string } } };

export type DeletePostsMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostsMutation = { __typename?: 'Mutation', deletePost: boolean };

export type UserLogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type UserLogOutMutation = { __typename?: 'Mutation', logout: boolean };

export type UserPhoneLoginOrregistMutationVariables = Exact<{
  phone: Scalars['String'];
  token: Scalars['String'];
}>;


export type UserPhoneLoginOrregistMutation = { __typename?: 'Mutation', userPhoneLoginOrregist: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, createdAt: string, updatedAt: string }> } };

export type CreateUserMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, createdAt: string, phone: string } };

export type SendtokenMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type SendtokenMutation = { __typename?: 'Mutation', sendToken: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', phone: string, id: string }> } };

export type UpdatePostsMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdatePostsMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'Post', id: string, updatedAt: string, title: string }> };

export type UserLoginMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, phone: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, posts: Array<{ __typename?: 'Post', id: string, title: string }> }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string }> };


export const CreatePostsDocument = gql`
    mutation CreatePosts($title: String!) {
  createPost(title: $title) {
    id
    createdAt
    updatedAt
    title
    creator {
      id
    }
  }
}
    `;

export function useCreatePostsMutation() {
  return Urql.useMutation<CreatePostsMutation, CreatePostsMutationVariables>(CreatePostsDocument);
};
export const DeletePostsDocument = gql`
    mutation deletePosts($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostsMutation() {
  return Urql.useMutation<DeletePostsMutation, DeletePostsMutationVariables>(DeletePostsDocument);
};
export const UserLogOutDocument = gql`
    mutation userLogOut {
  logout
}
    `;

export function useUserLogOutMutation() {
  return Urql.useMutation<UserLogOutMutation, UserLogOutMutationVariables>(UserLogOutDocument);
};
export const UserPhoneLoginOrregistDocument = gql`
    mutation UserPhoneLoginOrregist($phone: String!, $token: String!) {
  userPhoneLoginOrregist(tokenData: {phone: $phone, token: $token}) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
    }
  }
}
    `;

export function useUserPhoneLoginOrregistMutation() {
  return Urql.useMutation<UserPhoneLoginOrregistMutation, UserPhoneLoginOrregistMutationVariables>(UserPhoneLoginOrregistDocument);
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
export const SendtokenDocument = gql`
    mutation Sendtoken($phone: String!) {
  sendToken(phone: $phone) {
    errors {
      field
      message
    }
    user {
      phone
      id
    }
  }
}
    `;

export function useSendtokenMutation() {
  return Urql.useMutation<SendtokenMutation, SendtokenMutationVariables>(SendtokenDocument);
};
export const UpdatePostsDocument = gql`
    mutation UpdatePosts($id: String!, $title: String!) {
  updatePost(id: $id, title: $title) {
    id
    updatedAt
    title
  }
}
    `;

export function useUpdatePostsMutation() {
  return Urql.useMutation<UpdatePostsMutation, UpdatePostsMutationVariables>(UpdatePostsDocument);
};
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
export const MeDocument = gql`
    query Me {
  me {
    id
    posts {
      id
      title
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    title
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};