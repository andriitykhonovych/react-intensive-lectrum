import { MAIN_URL, TOKEN } from "./config";

export const api = {
    async fetchPosts () {
        const response = await fetch(`${MAIN_URL}?size=20`, {
            method: "GET",
        });

        if (response.status !== 200) {
            throw new Error("Posts were not loaded");
        }

        const { data: posts } = await response.json();

        return posts;
    },
    async createPosts (comment) {
        const response = await fetch(MAIN_URL, {
            method:  "POST",
            headers: {
                "Content-type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        if (response.status !== 200) {
            throw new Error("Posts were not loaded");
        }

        const { data: post } = await response.json();

        return post;
    },
    async likePost (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization:  TOKEN,
            },
        });

        if (response.status !== 200) {
            throw new Error("Posts were not liked");
        }

        const { data: posts } = await response.json();

        return posts;
    },
    async removePost (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error("Posts were not deleted");
        }
    },
};
