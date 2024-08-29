import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StudentState = {
  id: number;
  fullName: string;
  email: string;
  idLevel: number;
};

const key = "student";

// Guardar el estudiante en localStorage
const saveStudentToLocalStorage = (student: StudentState) => {
  localStorage.setItem(key, JSON.stringify(student));
};

// Eliminar el estudiante de localStorage
const removeStudentFromLocalStorage = () => {
  localStorage.removeItem(key);
};

// Obtener el estudiante desde localStorage
const getStudentFromLocalStorage = (): StudentState | null => {
  const storedStudent = localStorage.getItem(key);
  return storedStudent ? JSON.parse(storedStudent) : null;
};

const studentSlice = createSlice({
  name: "student",
  initialState: getStudentFromLocalStorage() as StudentState | null,
  reducers: {
    loginStudentSuccess(state, action: PayloadAction<StudentState>) {
      state = action.payload;
      saveStudentToLocalStorage(state);
      return state;
    },
    logoutStudent(state) {
      state = null;
      removeStudentFromLocalStorage();
      return state;
    },
  },
});

export const { loginStudentSuccess, logoutStudent } = studentSlice.actions;

export default studentSlice.reducer;
