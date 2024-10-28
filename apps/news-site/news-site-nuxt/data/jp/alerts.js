export const alerts = {
    home: {
        notification: {
            name: "cookies",
            title: "このウェブサイトは Cookie を使用しています 🍪",
            description: "Cookieを使用して、サイトでのエクスペリエンスを向上させ、可能な限り最も関連性の高いコンテンツを表示します。詳細については、プライバシーポリシーとCookieポリシーをお読みください。",
            actions: [
                {
                    name: "キャンセル",
                    priority: "secondary",
                    type: "reject",
                },
                {
                    name: "受け入れる",
                    priority: "primary",
                    type: "accept",
                },
            ],
        },
    },
    us: {
        message: {
            title: "ニュースブレイキングをご覧ください！",
            description: "重要なことが起こったので、あなたはそれを見るべきです！",
        },
    },
    world: {},
    politics: {},
    business: {},
    opinion: {},
    health: {},
};
