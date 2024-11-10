export const fuseOptions = {
    keys: ["title", "url"],
    threshold: 0.4,
};

// Fuse.js settings for bookmarks since they have parent field too
export const bookmarkFuseOptions = {
    keys: [
        {
            name: "title",
            weight: 3,
        },
        {
            name: "url",
            weight: 2,
        },

        {
            name: "parent",
            weight: 1,
        },
    ],
    threshold: 0.4,
};

export const fuseColorOptions = {
    keys: ["color"],
    threshold: 0.4,
};
