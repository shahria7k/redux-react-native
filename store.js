import { configureStore } from "@reduxjs/toolkit";
import navRedcuer from "./slices/navSlice";
export const store = configureStore({
	reducer: {
		nav: navRedcuer,
	},
});
