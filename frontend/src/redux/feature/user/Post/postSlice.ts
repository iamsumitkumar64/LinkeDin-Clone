"use client";

import { createSlice } from "@reduxjs/toolkit";
import { PostState } from "./postType";
import { getPosts, createPost, deletePost } from "./postAction";

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
    totalDocuments: 0,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.meta.arg?.page || action.meta.arg.page === 1) {
                    state.posts = action.payload.posts || [];
                } else {
                    const existingIds = new Set(state.posts.map((p) => p.uuid));
                    const newPosts = (action.payload.posts || []).filter(
                        (p) => !existingIds.has(p.uuid)
                    );
                    state.posts = [...state.posts, ...newPosts];
                }
                state.totalDocuments = action.payload.totalDocuments || 0;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(
                    (p) => p.uuid !== action.payload
                );
            });
    },
});

export default postSlice.reducer;