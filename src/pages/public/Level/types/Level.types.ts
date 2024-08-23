type Cohort = {
  id: number;
  title: string;
  description: string;
  endDate: string;
  startDate: string;
  registrationEndDate: string;
  registrationStartDate: string;
};

// Define the type for the teacher object
type Teacher = {
  id: number;
  name: string;
  lastName: string;
  imgUrl: string | null;
}

// Define the type for the teacher relation within the level
export type LevelTeacher = {
  levelId: number;
  teacherId: number;
  teacher: Teacher;
}

export type LevelDto = {
  id: number;
  title: string;
  description: string;
  order: number;
  cohorts: Cohort[];
  teachers: LevelTeacher[];
};

type Benefit = {
  id: number;
  description: string;
};

type PaymentMethod = {
  id: number;
  description: string;
};

export type PlaneDto = {
  id: number;
  idLevel: number;
  title: string;
  description: string;
  amount: string;
  numInstallments: number;
  discountPercentage: number;
  benefits: Benefit[];
  paymentMethods: PaymentMethod[];
};
