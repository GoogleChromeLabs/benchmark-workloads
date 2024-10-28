export const alerts = {
    home: {
        notification: {
            name: "cookies",
            title: "This website uses cookies 🍪",
            description: "We use cookies to improve your experience on our site and to show you the most relevant content possible. To find out more, please read our privacy policy and our cookie policy.",
            actions: [
                {
                    name: "Cancel",
                    priority: "secondary",
                    type: "reject",
                },
                {
                    name: "Accept",
                    priority: "primary",
                    type: "accept",
                },
            ],
        },
    },
    us: {
        message: {
            title: "Watch breaking news!",
            description: "Something important happened and you should watch it!",
        },
    },
    world: {},
    politics: {},
    business: {},
    opinion: {},
    health: {},
};
