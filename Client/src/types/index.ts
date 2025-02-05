export interface Backend {
  id: string;
  title: string;
  description: string;
  language: string;
  framework: string;
  apiType: string;
  author: string;
  stars: number;
  downloads: number;
  rating: number;
  likes?: number;
  createdAt: string;
  githubUrl?: string;
}

export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}