export const alerts = {
    home: {
        notification: {
            name: "cookies",
            title: "هذاالموقعيستخدمالكوكيز 🍪",
            description: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا ولإظهار المحتوى الأكثر ملاءمة لك. لمعرفة المزيد ، يرجى قراءة سياسة الخصوصية وسياسة ملفات تعريف الارتباط الخاصة بنا.",
            actions: [
                {
                    name: "يلغي",
                    priority: "secondary",
                    type: "reject",
                },
                {
                    name: "يقبل",
                    priority: "primary",
                    type: "accept",
                },
            ],
        },
    },
    us: {
        message: {
            title: "شاهد الأخبار العاجلة!",
            description: "حدث شيء مهم ويجب عليك مشاهدته!",
        },
    },
    world: {},
    politics: {},
    business: {},
    opinion: {},
    health: {},
};
