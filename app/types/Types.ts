export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};

export type AuthType = {
  name: string;
  id: string;
  email: string;
  image: string;
  post: {
    createdAt: string;
    id: string;
    title: string;
    comments?: {
      createdAt: string;
      id: string;
      postId: string;
      userId: string;
    }[];
  }[];
};

export type OnePostType = {
  id: string;
  title: string;
  updatedAt?: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  comments: {
    id: string;
    message: string;
    title: string;
    postId: string;
    userId: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }[];
};
