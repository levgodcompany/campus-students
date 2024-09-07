export type Unit = {
    id: number;
    title: string;
    description: string;
    order: number;
    idLevel: number;
    enabled: boolean;
}

export type UnitCreate = {
    title: string;
    description: string;
    order: number;
    idLevel: number;
}


export type TeacherDto = {
    id: number;
    fullName: string;
    imgUrl: string | null;
}