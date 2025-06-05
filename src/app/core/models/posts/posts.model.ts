export interface Tag {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface BiItem {
  id: number;
  title: string;
  description: string;
  link: string;
  departmentId: number;
  tags: Tag[];
  department: Department;
  imageUrl: string;
}
