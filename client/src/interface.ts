export interface IUser {
  id?: string;
  email?: string;
  password?: string;
  name: string;
  boards?: string[];
  created_at?: string;
  avatar?: string;
  theme?: string;
}

export interface IBoard {
  id?: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  owner?: string;
  members?: string[];
  columns?: string[];
  member_roles?: string[];
}

export interface IColumn {
  id?: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  board?: string;
  tasks?: string[];
}

export interface ITask {
  id?: string;
  title: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  column?: string;
  board?: string;
  creator?: string;
  assignee?: string;
  status?: string;
  due_date?: string;
}