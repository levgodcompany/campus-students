export type Module = {
    id: number;
    title: string;
    description: string;
    idCourse: number;
    order: number;
    fileURL: string | null;
    typeFile: string | null;
}

export type ModuleCreate = Omit<Module, 'id'> 