type levelDto = {
  id: number;
  title: string;
  description: string;
  order: number;
};

export type TypeLevelDto = {
  id: number;
  title: string;
  description: string;
  levels: levelDto[];
};

export type TeacherDto = {
  id: number;
  name: string;
  lastName: string;
  imgUrl: string | null;
};
