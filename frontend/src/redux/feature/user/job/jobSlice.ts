import { createSlice } from "@reduxjs/toolkit";
import {
    getJobs,
    applyJob,
    getAppliedJobs,
    deleteApplication,
} from "./jobAction";
import { JobState } from "./jobType";

const initialState: JobState = {
    jobs: [],
    applications: [],
    totalJobDocuments: 0,
    totalApplicationDocuments: 0,
    loading: false,
    error: null,
};

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.fulfilled, (state, action) => {
                if (!action.meta.arg?.page || action.meta.arg.page === 1) {
                    state.jobs = action.payload.jobs || [];
                } else {
                    const existingIds = new Set(state.jobs.map((j) => j.uuid));
                    const newJobs = (action.payload.jobs || []).filter(
                        (j: any) => !existingIds.has(j.uuid)
                    );
                    state.jobs = [...state.jobs, ...newJobs];
                }
                state.totalJobDocuments = action.payload.totalDocuments || 0;
            })
            .addCase(applyJob.fulfilled, (state, action) => {
                state.applications.push(action.payload);
            })
            .addCase(getAppliedJobs.fulfilled, (state, action) => {
                state.applications = action.payload.jobs;
                state.totalApplicationDocuments = action.payload.totalDocuments;
            })
            .addCase(deleteApplication.fulfilled, (state, action) => {
                state.applications = state.applications.filter(
                    (app) => app.uuid !== action.payload
                );
            });
    },
});

export default jobSlice.reducer;