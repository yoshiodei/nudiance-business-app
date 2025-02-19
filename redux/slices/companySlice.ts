import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CompanyState = {company: {
  uid: string;
  name: string;
  email: string;
  size: string;
  // jobListing: [];
  image: string;
  wallpaper: string;
  password: string;
}};

const initialState: CompanyState = {
 company: {
  uid: '',
  name: '',
  size: '',
  email: '',
  // jobListing: [],
  image: '',
  wallpaper: '',
  password: '',
}
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany(state, action: PayloadAction<CompanyState['company']>) {
      state.company = action.payload;
    },
    updateCompany(state, action) {
      state.company = {...state.company, ...action.payload};
    },
    clearCompany(state) {
      state.company = {
        uid: '',
        name: '',
        size: '',
        email: '',
        // jobListing: [],
        image: '',
        wallpaper: '',
        password: '',
      };
    },
  },
});

export const { setCompany, clearCompany, updateCompany } = companySlice.actions;

export default companySlice.reducer;